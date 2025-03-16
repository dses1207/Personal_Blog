// 從 Contentlayer 自動生成的型別與資料中引入所有文章資料
import { allPosts } from '.contentlayer/generated';
import { GetStaticProps } from 'next';

// 從 date-fns 套件引入 compareDesc 函數，用於比較兩個日期，並決定排序順序
import { compareDesc } from 'date-fns';

import type { NextPage } from 'next';
import { ArticleJsonLd } from 'next-seo';

import PostList, { PostForPostList } from '@/components/PostList';
import { siteConfigs } from '@/configs/siteConfigs';

import generateRSS from '@/lib/generateRSS';

type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
};

export const getStaticProps: GetStaticProps<Props> = () => {
  // 首先對 allPosts 陣列依據日期進行排序，從最新到最舊
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // 接著把排序後的陣列 map 成只包含必要欄位的資料物件
  const posts = sortedPosts.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
  })) as PostForIndexPage[];

  generateRSS();

  // 將整理好的 posts 透過 props 傳遞給頁面元件
  return { props: { posts } };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />

      <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h1 className="tre ext-center sm:text-left">Greetings, I'm Roy Li.</h1>
        <p>開發日誌，全端、AI和APP</p>
        <p>純紀錄，也期望內容會對你有所幫助</p>
        <p>祝你有美好的一天 : )</p>
      </div>
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>最新文章</h2>
        </div>

        <PostList posts={posts} />
      </div>
    </>
  );
};

export default Home;