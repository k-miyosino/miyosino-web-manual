import { chromium, Page, BrowserContext } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const BASE_URL = 'https://k-miyosino.github.io/miyosino-web';
const DOCS_DIR = path.resolve(__dirname, '..', 'docs');

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function shot(
  page: Page,
  outputPath: string,
  clip?: { x: number; y: number; width: number; height: number }
) {
  await page.screenshot({
    path: outputPath,
    animations: 'disabled',
    ...(clip ? { clip } : {}),
  });
  console.log(`  Saved: ${path.relative(DOCS_DIR, outputPath)}`);
}

async function goto(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
}

// ---------------------------------------------------------------------------
// 1. resident/images/ — ログイン関連（既存の画像参照を埋めるための最優先4枚）
// ---------------------------------------------------------------------------

async function captureLoginImages(page: Page, out: string) {
  console.log('\n[ログイン関連]');

  // header.png — ヘッダー全体
  await goto(page, `${BASE_URL}/`);
  const headerBox = await page.locator('header').first().boundingBox();
  await shot(page, path.join(out, 'header.png'), headerBox ?? undefined);

  // footer.png — フッター全体
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const footerBox = await page.locator('footer').first().boundingBox();
  await shot(page, path.join(out, 'footer.png'), footerBox ?? undefined);
  await page.evaluate(() => window.scrollTo(0, 0));

  // member-button.png — 「組合員専用」ボタン
  const memberBtn = page.getByRole('link', { name: /組合員専用/ }).first();
  const btnBox = await memberBtn.boundingBox();
  if (btnBox) {
    // 余白を少し追加して見やすくする
    await shot(page, path.join(out, 'member-button.png'), {
      x: Math.max(0, btnBox.x - 16),
      y: Math.max(0, btnBox.y - 8),
      width: btnBox.width + 32,
      height: btnBox.height + 16,
    });
  } else {
    console.warn('  WARN: 組合員専用ボタンが見つかりませんでした');
    await shot(page, path.join(out, 'member-button.png'));
  }

  // login-screen.png — ログイン画面
  await goto(page, `${BASE_URL}/member`);
  await shot(page, path.join(out, 'login-screen.png'));

  // logout-button.png — ログアウトボタン（認証必須、環境変数がない場合スキップ）
  const memberId = process.env.MEMBER_ID;
  const memberPassword = process.env.MEMBER_PASSWORD;
  if (memberId && memberPassword) {
    const idField = page.getByLabel('ID').or(page.locator('input[type="text"]')).first();
    const pwField = page.getByLabel('パスワード').or(page.locator('input[type="password"]')).first();
    await idField.fill(memberId);
    await pwField.fill(memberPassword);
    await page.getByRole('button', { name: /ログイン/ }).click();
    await page.waitForLoadState('networkidle');
    const logoutBtn = page
      .getByRole('button', { name: /ログアウト/ })
      .or(page.getByRole('link', { name: /ログアウト/ }))
      .first();
    const logoutBox = await logoutBtn.boundingBox();
    const validBox = logoutBox && logoutBox.width > 0 && logoutBox.height > 0 ? logoutBox : undefined;
    await shot(page, path.join(out, 'logout-button.png'), validBox);
  } else {
    console.log('  SKIP: logout-button.png（MEMBER_ID / MEMBER_PASSWORD が未設定）');
  }
}

// ---------------------------------------------------------------------------
// 2. resident/images/ — 公開ページ
// ---------------------------------------------------------------------------

async function capturePublicPages(page: Page, out: string) {
  console.log('\n[公開ページ]');

  const pages: Array<{ file: string; path: string; label: string }> = [
    { file: 'home-overview.png', path: '/', label: 'トップ' },
    { file: 'features.png', path: '/features', label: '特徴' },
    { file: 'community.png', path: '/community', label: 'コミュニティ' },
    { file: 'facilities.png', path: '/facilities', label: '共有施設' },
    { file: 'surrounding.png', path: '/surrounding', label: '周辺施設' },
    { file: 'access.png', path: '/access', label: 'アクセス' },
  ];

  for (const p of pages) {
    await goto(page, `${BASE_URL}${p.path}`);
    await shot(page, path.join(out, p.file));
  }
}

// ---------------------------------------------------------------------------
// 3. resident/images/ — モバイル表示
// ---------------------------------------------------------------------------

async function captureMobileImages(context: BrowserContext, out: string) {
  console.log('\n[モバイル表示]');

  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });

  await goto(mobilePage, `${BASE_URL}/`);
  await shot(mobilePage, path.join(out, 'mobile-menu-closed.png'));

  // ハンバーガーメニューを開く
  const hamburger = mobilePage
    .locator('button[aria-label*="メニュー"], button[aria-label*="menu"], button:has(svg)')
    .first();
  try {
    await hamburger.click({ timeout: 5000 });
    await mobilePage.waitForTimeout(400);
    await shot(mobilePage, path.join(out, 'mobile-menu-open.png'));
  } catch {
    console.warn('  WARN: ハンバーガーメニューボタンが見つかりませんでした');
  }

  await mobilePage.close();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  const residentImagesDir = path.join(DOCS_DIR, 'resident', 'images');
  ensureDir(residentImagesDir);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: 'ja-JP',
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    await captureLoginImages(page, residentImagesDir);
    await capturePublicPages(page, residentImagesDir);
    await captureMobileImages(context, residentImagesDir);
    console.log('\n完了: すべてのスクリーンショットを保存しました。');
  } catch (err) {
    console.error('エラー:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
