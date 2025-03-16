// Custom rehype plugin to add width and height to local images
// To make Next.js <Image/> works
// Ref: https://kylepfromer.com/blog/nextjs-image-component-blog

// Similiar structure to:
// https://github.com/JS-DevTools/rehype-inline-svg/blob/master/src/inline-svg.ts
import imageSize from 'image-size';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';
import fs from 'fs';

const sizeOf = promisify(imageSize);

/**
 * An `<img>` HAST node
 */
interface Node {
  type: string;
  tagName?: string;
  properties?: any;
  children?: Node[];
}

interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    height?: number;
    width?: number;
    base64?: string;
  };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

/**
 * Filters out non absolute paths from the public folder.
 */
function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith('/');
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const imagePath = path.join(process.cwd(), 'public', node.properties.src);
  const res = await sizeOf(imagePath);

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  // 讀取圖片文件
  const imageBuffer = await fs.promises.readFile(imagePath);
  // 使用Buffer作為getPlaiceholder的輸入
  const { base64 } = await getPlaiceholder(imageBuffer, { size: 10 }); // 10 is to increase detail (default is 4)
  
  node.properties.width = res.width;
  node.properties.height = res.height;
  node.properties.base64 = base64;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/app/api-reference/components/image
 */
export default function imageMetadata() {
  return async function transformer(tree: Node): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}
