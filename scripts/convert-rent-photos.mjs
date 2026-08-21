// 募集写真をHP用に変換する: 長辺1600px・webp q76
// 使い方: node scripts/convert-rent-photos.mjs <元写真フォルダ>
//   <元写真フォルダ>/{slug}/{nn}.jpg → public/images/rent/{slug}/{nn}.webp
// 元写真は Drive「公開用_募集写真」（公開審査済みセット）からASCII名で staging したもの。
// パスにバックスラッシュを書かないこと（Tailwindのスキャナが \e... をCSSエスケープと誤認してビルドが落ちる）。
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = process.argv[2];
if (!SRC) {
  console.error('usage: node scripts/convert-rent-photos.mjs <staging-dir>');
  process.exit(1);
}
const DST = 'public/images/rent';

for (const slug of readdirSync(SRC)) {
  const outDir = join(DST, slug);
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(join(SRC, slug))) {
    const out = join(outDir, f.replace(/\.jpg$/i, '.webp'));
    await sharp(join(SRC, slug, f))
      .rotate() // EXIF orientation
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(out);
    console.log(out);
  }
}
