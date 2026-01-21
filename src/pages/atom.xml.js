import { getCollection } from 'astro:content';
import { releases } from '../data/releases.js';

export async function GET(context) {
  const posts = await getCollection('blog');
  const site = context.site?.href || 'https://rapscli.xyz';

  // Combine blog posts and releases
  const blogItems = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      id: `${site}/blog/${post.id.replace(/\.mdx?$/, '')}/`,
      title: post.data.title,
      updated: post.data.updatedDate || post.data.pubDate,
      published: post.data.pubDate,
      summary: post.data.description,
      author: post.data.author || 'Dmytro Yemelianov',
      link: `${site}/blog/${post.id.replace(/\.mdx?$/, '')}/`,
      categories: post.data.tags || [],
    }));

  const releaseItems = releases.map((release) => ({
    id: `https://github.com/dmytro-yemelianov/raps/releases/tag/v${release.version}`,
    title: `RAPS v${release.version} Released`,
    updated: new Date(release.date),
    published: new Date(release.date),
    summary: release.description,
    author: 'RAPS Team',
    link: `https://github.com/dmytro-yemelianov/raps/releases/tag/v${release.version}`,
    categories: ['release', 'changelog'],
  }));

  const allItems = [...blogItems, ...releaseItems].sort(
    (a, b) => new Date(b.updated).valueOf() - new Date(a.updated).valueOf()
  );

  const latestUpdate = allItems[0]?.updated || new Date();

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>RAPS - Rust APS CLI Updates</title>
  <subtitle>All updates from RAPS: blog posts, releases, and announcements for the Rust Autodesk Platform Services CLI.</subtitle>
  <link href="${site}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${site}" rel="alternate" type="text/html"/>
  <id>${site}/</id>
  <updated>${new Date(latestUpdate).toISOString()}</updated>
  <author>
    <name>Dmytro Yemelianov</name>
    <uri>https://www.linkedin.com/in/dmytro-yemelianov/</uri>
  </author>
  <rights>Copyright ${new Date().getFullYear()} Dmytro Yemelianov</rights>
  <generator>Astro</generator>
  ${allItems
    .map(
      (item) => `
  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${item.link}" rel="alternate" type="text/html"/>
    <id>${item.id}</id>
    <published>${new Date(item.published).toISOString()}</published>
    <updated>${new Date(item.updated).toISOString()}</updated>
    <author>
      <name>${escapeXml(item.author)}</name>
    </author>
    <summary>${escapeXml(item.summary)}</summary>
    ${item.categories.map((cat) => `<category term="${escapeXml(cat)}"/>`).join('\n    ')}
  </entry>`
    )
    .join('')}
</feed>`;

  return new Response(atomFeed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
