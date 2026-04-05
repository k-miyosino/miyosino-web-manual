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

  // kintone-auth.png — ログイン後に表示される Kintone 許可画面（認証必須）
  const memberId = process.env.MEMBER_ID;
  const memberPassword = process.env.MEMBER_PASSWORD;
  if (memberId && memberPassword) {
    await goto(page, `${BASE_URL}/member`);
    const idField = page.getByLabel('ID').or(page.locator('input[type="text"]')).first();
    const pwField = page.getByLabel('パスワード').or(page.locator('input[type="password"]')).first();
    await idField.fill(memberId);
    await pwField.fill(memberPassword);
    await page.getByRole('button', { name: /ログイン/ }).click();
    // Kintone OAuth 認証ページへのリダイレクトを待つ
    await page.waitForURL('**/oauth2/authorization**', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await shot(page, path.join(out, 'kintone-auth.png'));

    // 「許可する」ボタンをクリックして組合員専用ページへ進む
    const allowBtn = page.getByRole('button', { name: '許可' });
    await allowBtn.click({ timeout: 10000 });
    await page.waitForURL(`${BASE_URL}/**`, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // member-top.png — 組合員専用トップページ
    await shot(page, path.join(out, 'member-top.png'));
    console.log(`  現在のURL: ${page.url()}`);
  } else {
    console.log('  SKIP: kintone-auth.png / member-top.png（MEMBER_ID / MEMBER_PASSWORD が未設定）');
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
    { file: 'contact.png', path: '/contact', label: 'お問い合わせ' },
  ];

  for (const p of pages) {
    await goto(page, `${BASE_URL}${p.path}`);
    await shot(page, path.join(out, p.file));
  }

  // features-subheader.png — ページタイトル（h1）＋セクションナビタブをまとめたサブヘッダー
  await goto(page, `${BASE_URL}/features`);
  const h1El = page.locator('main h1').first();
  const navEl = page.locator('main nav, [role="tablist"], [class*="tab"]').first();
  const h1Box = await h1El.boundingBox();
  const navBox = await navEl.boundingBox();
  if (h1Box && navBox) {
    await shot(page, path.join(out, 'features-subheader.png'), {
      x: Math.min(h1Box.x, navBox.x),
      y: h1Box.y,
      width: Math.max(h1Box.width, navBox.width),
      height: (navBox.y + navBox.height) - h1Box.y,
    });
  } else {
    console.warn('  WARN: サブヘッダー要素が見つかりませんでした。全体を撮影します');
    await shot(page, path.join(out, 'features-subheader.png'));
  }
}

// ---------------------------------------------------------------------------
// 3. resident/images/ — 組合員専用ページ（要ログイン）
// ---------------------------------------------------------------------------

async function captureMemberPages(page: Page, out: string) {
  if (!process.env.MEMBER_ID || !process.env.MEMBER_PASSWORD) {
    console.log('\n[組合員専用ページ] SKIP（MEMBER_ID / MEMBER_PASSWORD が未設定）');
    return;
  }
  console.log('\n[組合員専用ページ]');

  // ログイン済みセッションを前提。URLは実際のサイト構造に合わせて調整すること
  const memberPages: Array<{ file: string; path: string; label: string }> = [
    { file: 'member-announcements.png', path: '/member/announcements', label: 'お知らせ' },
    { file: 'member-circulars.png',     path: '/member/circulars',     label: '回覧板' },
    { file: 'member-events.png',        path: '/member/events',        label: 'イベント' },
    { file: 'member-applications.png',  path: '/member/applications',  label: '各種申請書' },
    { file: 'member-green-wellness.png',path: '/member/green-wellness',label: 'グリーンウェルネス' },
    { file: 'member-management.png',    path: '/member/management',    label: '団地運営' },
  ];

  for (const p of memberPages) {
    await goto(page, `${BASE_URL}${p.path}`);
    console.log(`  現在のURL: ${page.url()}`);
    await shot(page, path.join(out, p.file));
  }

  // member-minutes-top.png — 会議情報ページ（タイトル含む、スクロールなし）
  await goto(page, `${BASE_URL}/member/minutes`);
  console.log(`  現在のURL: ${page.url()}`);
  await shot(page, path.join(out, 'member-minutes-top.png'));

  // member-minutes.png — スクロールして音声ファイルも表示
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(300);
  await shot(page, path.join(out, 'member-minutes.png'));


  // member-events-calendar.png — イベントページのカレンダー表示
  await goto(page, `${BASE_URL}/member/events`);
  const calendarBtn = page.getByRole('button', { name: /カレンダー/ }).or(
    page.getByRole('tab', { name: /カレンダー/ })
  ).first();
  try {
    await calendarBtn.click({ timeout: 5000 });
    await page.waitForLoadState('networkidle');
    await shot(page, path.join(out, 'member-events-calendar.png'));
  } catch {
    console.warn('  WARN: カレンダーボタンが見つかりませんでした');
  }
}

// ---------------------------------------------------------------------------
// 4. resident/images/ — モバイル表示
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
    await captureMemberPages(page, residentImagesDir);
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
