/**
 * novshi.co.jp — 静的アセット配信＋wwwの正規化。
 *
 * www.novshi.co.jp へのアクセスは apex（novshi.co.jp）へ301で寄せる。
 * それ以外は dist/ の静的ファイルをそのまま返す（末尾スラッシュの正規化と
 * 404ページの扱いは wrangler.jsonc の assets 設定が担う）。
 *
 * リダイレクトをダッシュボードのRedirect Rulesではなくここに置いているのは、
 * 設定の正本をgitに残すため（2026-08-22 Cloudflare移行時の判断）。
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
