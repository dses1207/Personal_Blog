import { useRouter } from 'next/router';

import CustomLink from '@/components/CustomLink';
import formatDate from '@/lib/formatDate';

export interface PostForPostList {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
}

type Props = {
  posts: PostForPostList[];
};

export default function PostList({ posts = [] }: Props) {
  const { locale } = useRouter();

  return (
    <ul className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
      {!posts.length && 'No posts found.'}
      {posts.map((post) => {
        const { slug, date, title, description, path } = post;
        return (
          <li key={slug} className="group transition-colors">
            <CustomLink href={path}>
              <article className="space-y-2 rounded-xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-sm font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400 md:text-base">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </dl>
                <div className="space-y-3 xl:col-span-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl md:text-2xl">
                      {title}
                    </h3>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-500 transition-colors md:prose-base dark:text-gray-400">
                    {description}
                  </div>
                </div>
              </article>
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
}

// import { useRouter } from 'next/router';
// // 從 Next.js 引入 useRouter Hook，取得路由相關資訊（例如 locale）

// import CustomLink from '@/components/CustomLink';
// // 引入自訂的連結元件，用來處理內部連結與外部連結的行為

// import formatDate from '@/lib/formatDate';
// // 引入日期格式化函式，根據 locale 格式化日期

// // 定義一個接口，用於描述文章的資料結構
// export interface PostForPostList {
//   slug: string;
//   date: string;
//   title: string;
//   description: string;
//   path: string;
// }

// // 定義 PostList 元件的 Props 型別，posts 為文章陣列
// type Props = {
//   posts: PostForPostList[];
// };

// // PostList 元件：負責渲染一個文章列表
// export default function PostList({ posts = [] }: Props) {
//   // 使用 useRouter 取得當前 locale（語系）
//   const { locale } = useRouter();

//   return (
//     // 列表容器，使用 Tailwind CSS 設定分隔線與過渡效果
//     <ul className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
//       {/* 若文章陣列為空則顯示提示文字 */}
//       {!posts.length && 'No posts found.'}
//       {posts.map((post) => {
//         // 從每篇文章物件中解構出需要的資料
//         const { slug, date, title, description, path } = post;
//         return (
//           // 每篇文章以 <li> 呈現，key 用 slug 確保列表中元素唯一
//           <li key={slug} className="group transition-colors">
//             {/* 使用 CustomLink 將整個文章區塊變成一個連結 */}
//             <CustomLink href={path}>
//               {/* 文章內容區塊，用於排版文章摘要 */}
//               <article className="space-y-2 rounded-xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:grid xl:grid-cols-4  xl:items-baseline xl:space-y-0">
//                 {/* 定義發佈日期區域 */}
//                 <dl>
//                   <dt className="sr-only">Published on</dt>
//                   <dd className="text-sm font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400 md:text-base">
//                     {/* 使用 <time> 標籤並格式化日期 */}
//                     <time dateTime={date}>{formatDate(date, locale)}</time>
//                   </dd>
//                 </dl>
//                 {/* 主要文章內容，包括標題和描述 */}
//                 <div className="space-y-3 xl:col-span-3">
//                   <div>
//                     {/* 文章標題，使用 <h3> 並透過 Tailwind 設定字體與顏色 */}
//                     <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl md:text-2xl">
//                       {title}
//                     </h3>
//                   </div>
//                   {/* 文章描述區塊，使用 Tailwind Typography 的 prose 類別來美化長文本 */}
//                   <div className="prose prose-sm max-w-none text-gray-500 transition-colors dark:text-gray-400 md:prose-base">
//                     {description}
//                   </div>
//                 </div>
//               </article>
//             </CustomLink>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
