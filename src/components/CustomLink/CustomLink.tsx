import Link from 'next/link';
import ExternalLinkIcon from './external-link';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<'a'>;

const CustomLink = ({ href, children, ...rest }: Props) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');
  // 檢查子元素是否為圖片元素
  const isImageLink = typeof children !== 'string' && 
    React.isValidElement(children) && 
    (children.type === 'img' || (children.type && (children.type as any).displayName === 'CustomImage'));

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      {/* 只有在非圖片且為文本的情況下才顯示外部連結圖標 */}
      {!isImageLink && typeof children === 'string' && (
        <ExternalLinkIcon className="ml-1 inline-block h-4 w-4" />
      )}
    </a>
  );
};

export default CustomLink;
