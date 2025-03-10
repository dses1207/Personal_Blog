import { defineDocumentType, makeSource } from 'contentlayer/source-files';

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
});
