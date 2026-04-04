---
title: Next.js（フロントエンド）
---

# Next.js（フロントエンド）

## 概要

- **フレームワーク:** Next.js 15.5.4（App Router）
- **言語:** TypeScript 5
- **スタイリング:** Tailwind CSS 4
- **出力形式:** 静的エクスポート（`output: 'export'`）

## 静的エクスポートについて

`next build` で `out/` ディレクトリに静的ファイル（HTML/CSS/JS）を生成します。  
サーバーサイドレンダリング（SSR）は使用していません。

APIへのアクセスはすべてクライアントサイド（ブラウザ側のJavaScript）で行われます。

## ページ構成

| URLパス | ページ |
|---------|--------|
| `/` | トップページ |
| `/features` | 団地の特徴 |
| `/community` | コミュニティ |
| `/facilities` | 共有施設・サービス |
| `/surrounding` | 周辺施設 |
| `/access` | アクセス |
| `/contact` | お問い合わせ |
| `/member` | 組合員専用トップ（認証必須） |
| `/member/announcements` | お知らせ（認証必須） |
| `/member/circulars` | 回覧板（認証必須） |
| `/member/events` | イベント（認証必須） |
| `/member/minutes` | 会議情報（認証必須） |
| `/member/applications` | 各種申請（認証必須） |
| `/member/green-wellness` | グリーンウェルネス（認証必須） |
| `/auth/callback` | 認証コールバック |

## ビルドコマンド

```bash
# 依存関係のインストール
npm ci

# 本番ビルド
npm run build

# ローカル開発サーバー
npm run dev
```

## コード品質

- **ESLint 9:** Lintチェック（`npm run lint`）
- **Prettier:** コード整形（`npm run format`）
- **Husky + lint-staged:** コミット前に自動Lint実行
