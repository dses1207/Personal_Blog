import { Feed } from 'feed';
import { writeFileSync } from 'fs';

import { siteConfigs } from '@/configs/siteConfigs';
import { allPosts } from '.contentlayer/generated';
import { compareDesc } from 'date-fns';
import { getPostOGImage } from '@/lib/getPostOGImage';

export default function generateRSS() {
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const author = {
    name: siteConfigs.author,
    email: siteConfigs.email,
    link: siteConfigs.fqdn,
  };

  const feed = new Feed({
    title: siteConfigs.title,
    description: siteConfigs.description,
    id: siteConfigs.fqdn,
    link: siteConfigs.fqdn,
    image: siteConfigs.logoUrl,
    favicon: siteConfigs.logoUrl,
    copyright: `Copyright © 2015 - ${new Date().getFullYear()} ${
      siteConfigs.credit
    }`,
    feedLinks: {
      rss2: `${siteConfigs.fqdn}/feed.xml`,
      json: `${siteConfigs.fqdn}/feed.json`,
      atom: `${siteConfigs.fqdn}/atom.xml`,
    },
    author: author,
  });

  sortedPosts.forEach((post) => {
    feed.addItem({
      id: siteConfigs.fqdn + post.path,
      title: post.title,
      link: siteConfigs.fqdn + post.path,
      description: post.description,
      // @ts-expect-error
      image: getPostOGImage(post.socialImage),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
      // content: post.body.html,
    });
  });

  writeFileSync('./public/feed.xml', feed.rss2());
  writeFileSync('./public/atom.xml', feed.atom1());
  writeFileSync('./public/feed.json', feed.json1());
}
