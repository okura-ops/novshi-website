// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://novshi.co.jp',
  // 末尾スラッシュなしが正（GSC・canonicalと一致）。
  // Cloudflare Pagesは about/index.html だと /about/ に正規化するため、
  // format:'file'（about.html）にして /about のまま配信させる
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  // /partners/ と /proposal/ は非公開ページ。sitemapに載せない
  // （Layoutのnoindex・robots.txtのDisallowと三点セットで維持する）
  integrations: [sitemap({ filter: (page) => !page.includes('/partners/') && !page.includes('/proposal/') })],
  vite: {
    plugins: [tailwindcss()]
  }
});
