import Image, { ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function CustomImage({
  src,
  height,
  width,
  base64,
  alt,
  ...otherProps
}: Props) {
  if (!src) return null;

  // 處理外部連結圖片
  if (typeof src === 'string' && src.startsWith('http')) {
    // 對於外部圖片使用 next/image 的 loader 方式
    return (
      <Image
        src={src}
        alt={alt || ''}
        height={height || 500}
        width={width || 800}
        sizes="(min-width: 40em) 40em, 100vw"
        style={{ maxWidth: '100%', height: 'auto' }}
        {...otherProps}
      />
    );
  }

  // 對於內部圖片但缺少尺寸的情況
  if (typeof src === 'string' && (!height || !width)) {
    // 使用預設尺寸並添加樣式確保響應式
    return (
      <img 
        src={src} 
        height={height} 
        width={width} 
        alt={alt || ''} 
        style={{ maxWidth: '100%', height: 'auto' }} 
        {...otherProps} 
      />
    );
  }

  // 正常情况：有尺寸的内部图片
  return (
    <Image
      src={src}
      alt={alt || ''}
      height={height}
      width={width}
      sizes="(min-width: 40em) 40em, 100vw"
      style={{ maxWidth: '100%', height: 'auto' }}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
    />
  );
}
