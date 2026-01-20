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
  integrations: [
    mdx({
      remarkPlugins: [simpleMermaid],
    }),
    sitemap(),
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
