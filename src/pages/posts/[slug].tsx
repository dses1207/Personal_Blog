// import { format, parseISO } from 'date-fns';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';

import { compareDesc } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts, Post } from '.contentlayer/generated';

import PostLayout, {
  PostForPostLayout,
  RelatedPostForPostLayout,
} from '@/components/PostLayout';

import mdxComponents from '@/lib/mdxComponents';

import { siteConfigs } from '@/configs/siteConfigs';
import { getPostOGImage } from '@/lib/getPostOGImage';

type PostForPostPage = PostForPostLayout & {
  title: string;
  description: string;
  date: string;
  path: string;
  socialImage: string | null;
  body: {
    code: string;
  };
};

type Props = {
  post: PostForPostPage;
  prevPost: RelatedPostForPostLayout;
  nextPost: RelatedPostForPostLayout;
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.path);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  // const post = allPosts.find((post) => post.slug === params?.slug);

  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const postIndex = sortedPosts.findIndex((post) => post.slug === params?.slug);
  if (postIndex === -1) {
    return {
      notFound: true,
    };
  }
  const prevFull = sortedPosts[postIndex + 1] || null;
  const prevPost: RelatedPostForPostLayout = prevFull
    ? { title: prevFull.title, path: prevFull.path }
    : null;
  const nextFull = sortedPosts[postIndex - 1] || null;
  const nextPost: RelatedPostForPostLayout = nextFull
    ? { title: nextFull.title, path: nextFull.path }
    : null;
  const postFull = sortedPosts[postIndex];
  const post: PostForPostPage = {
    title: postFull.title,
    date: postFull.date,
    description: postFull.description,
    path: postFull.path,
    socialImage: postFull.socialImage || null,
    body: {
      code: postFull.body.code,
    },
  };
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  };
};

const PostPage: NextPage<Props> = ({ post, prevPost, nextPost }) => {
  const {
    description,
    title,
    date,
    path,
    socialImage,
    body: { code },
  } = post;

  const url = siteConfigs.fqdn + path;
  const ogImage = getPostOGImage(socialImage);
  const MDXContent = useMDXComponent(code);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title: title,
          description: description,
          url: url,
          images: [
            {
              url: ogImage,
            },
          ],
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: date,
          },
        }}
      />

      <ArticleJsonLd
        url={url}
        title={title}
        images={[ogImage]}
        datePublished={date}
        dateModified={date}
        authorName={siteConfigs.author}
        description={description}
      />

      <PostLayout post={post} prevPost={prevPost} nextPost={nextPost}>
        <MDXContent components={mdxComponents} />
      </PostLayout>
    </>
  );
};

export default PostPage;
