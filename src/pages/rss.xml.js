import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Changelog releases data
const releases = [
  {
    version: '3.8.0',
    date: '2026-01-10',
    description: 'Interactive Shell, TAB Completion, Parameter Hints, Rust 2024 Edition',
  },
  {
    version: '3.7.0',
    date: '2026-01-07',
    description: 'Major Security Improvements, Performance Boost, Parallel Uploads, Secure Token Storage',
  },
  {
    version: '3.4.0',
    date: '2026-01-02',
    description: 'Version Display Fix, OAuth Callback Improvements, Windows Compatibility',
  },
  {
    version: '3.1.0',
    date: '2025-12-29',
    description: 'Rust 2024 Edition, CI Speedups, Command Dispatch Fix',
  },
  {
    version: '3.0.0',
    date: '2025-12-27',
    description: 'MCP Server for AI Assistant Integration with 14 MCP Tools',
  },
  {
    version: '2.1.0',
    date: '2025-12-26',
    description: 'Stability improvements, Bug fixes, Documentation updates',
  },
  {
    version: '2.0.0',
    date: '2025-12-25',
    description: 'ACC Checklists support, Plugin system, Pipeline automation improvements',
  },
  {
    version: '1.0.0',
    date: '2025-10-15',
    description: 'First stable release with complete APS API coverage, CI/CD ready',
  },
];

export async function GET(context) {
  const posts = await getCollection('blog');

  // Combine blog posts and releases into a single feed
  const blogItems = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author || 'Dmytro Yemelianov',
      link: `/blog/${post.id}/`,
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
