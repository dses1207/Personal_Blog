// 從 Contentlayer 自動生成的型別與資料中引入所有文章資料
import { allPosts } from '.contentlayer/generated';
import { GetStaticProps } from 'next';

// 從 date-fns 套件引入 compareDesc 函數，用於比較兩個日期，並決定排序順序
import { compareDesc } from 'date-fns';

import type { NextPage } from 'next';
import Head from 'next/head';
//import Image from 'next/image';
// import ThemeSwitch from '@/components/ThemeSwitch';
import PostList, { PostForPostList } from '@/components/PostList';

/**
 * getStaticProps 是 Next.js 提供的一個靜態生成（SSG）專用函數，
 * 這個函數會在編譯時被執行，用來取得頁面所需的資料，並將資料作為 props 傳遞給頁面元件。
 */
// export async function getStaticProps() {
//   // 將 allPosts 陣列依據日期進行排序，排序邏輯是：
//   // 使用 compareDesc 來比較每篇文章的 date 欄位（必須先轉換成 Date 物件）
//   // 若 a 的日期較晚，compareDesc 會回傳 -1，排序結果就是最新的文章排在最前面。
//   const posts = allPosts.sort((a, b) =>
//     compareDesc(new Date(a.date), new Date(b.date))
//   );

//   // 將排序後的文章資料透過 props 傳遞給頁面元件
//   return {
//     props: {
//       posts,
//     },
//   };
// }

// type Props = {
//   posts: Post[];
// };

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

  // 將整理好的 posts 透過 props 傳遞給頁面元件
  return { props: { posts } };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>My blog</title>
        <meta name="description" content="Welcome to Roy's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h1 className="tre ext-center sm:text-left">
          Greetings, I'm Roy.
        </h1>
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
    </div>
  );
};

export default Home;

/*

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/pages/index.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/
