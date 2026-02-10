import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { simpleMermaid } from './src/plugins/simple-mermaid.mjs';

export default defineConfig({
  site: 'https://rapscli.xyz',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    fallback: { uk: 'en' },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [simpleMermaid],
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          uk: 'uk',
        },
      },
      serialize(item) {
        // For each English page, add xhtml:link alternates for uk
        const enUrl = item.url;
        const site = 'https://rapscli.xyz';
        const path = enUrl.replace(site, '');
        const ukUrl = `${site}/uk${path === '/' ? '' : path}`;
        item.links = [
          { lang: 'en', url: enUrl },
          { lang: 'uk', url: ukUrl },
          { lang: 'x-default', url: enUrl },
        ];
        return item;
      },
    }),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [
      simpleMermaid,
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
