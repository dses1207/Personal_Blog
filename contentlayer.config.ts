import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import imageMetadata from './src/plugins/imageMetadata';

// 定義一個 Post 文件類型
export const Post = defineDocumentType(() => ({
  name: 'Post',
  // filePathPattern: `content/posts/**/*.md`,
  // contentType: 'markdown',
  filePathPattern: `content/posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    socialImage: {
      type: 'string',
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (post) => `/posts/${post.slug}`,
    },
  },
}));

// 建立 Contentlayer 資料來源設定
export default makeSource({
  contentDirPath: 'content', // 內容檔案放置的資料夾
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      imageMetadata,
    ],
  },
});
