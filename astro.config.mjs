// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://novshi.co.jp',
  // Vercel側が trailingSlash:false で /about/ → /about に308させるため、
  // サイトマップ・canonicalも末尾スラッシュなしに揃える
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
