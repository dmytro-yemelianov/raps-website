import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { releases } from '../data/releases.js';

export async function GET(context) {
  const posts = (await getCollection('blog')).filter(d => d.id.startsWith('en/'));

  const stripLocalePrefix = (id) => id.replace(/^(en|uk)\//, '');

  // Combine blog posts and releases into a single feed
  const blogItems = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author || 'Dmytro Yemelianov',
      link: `/blog/${stripLocalePrefix(post.id.replace(/\.mdx?$/, ''))}/`,
      categories: post.data.tags || [],
    }));

  const releaseItems = releases.map((release) => ({
    title: `RAPS v${release.version} Released`,
    pubDate: new Date(release.date),
    description: release.description,
    author: 'RAPS Team',
    link: `https://github.com/dmytro-yemelianov/raps/releases/tag/v${release.version}`,
    categories: ['release', 'changelog'],
  }));

  const allItems = [...blogItems, ...releaseItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'RAPS - Rust APS CLI Updates',
    description: 'All updates from RAPS: blog posts, releases, and announcements for the Rust Autodesk Platform Services CLI.',
    site: context.site,
    items: allItems,
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()} Dmytro Yemelianov</copyright>
<managingEditor>noreply@rapscli.xyz (Dmytro Yemelianov)</managingEditor>
<webMaster>noreply@rapscli.xyz (Dmytro Yemelianov)</webMaster>
<ttl>60</ttl>`,
  });
}
