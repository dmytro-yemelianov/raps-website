import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  return rss({
    title: 'RAPS Blog - DevOps for Design',
    description: 'Articles about CI/CD for Autodesk Platform Services, APS automation, and RAPS CLI tutorials.',
    site: context.site,
    items: posts
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        author: post.data.author || 'Dmytro Yemelianov',
        link: `/blog/${post.slug}/`,
        categories: post.data.tags,
      })),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()} Dmytro Yemelianov</copyright>
<managingEditor>dmytro@example.com (Dmytro Yemelianov)</managingEditor>
<webMaster>dmytro@example.com (Dmytro Yemelianov)</webMaster>`,
  });
}
