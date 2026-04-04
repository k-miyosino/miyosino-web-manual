---
title: 環境変数一覧
---

# 環境変数一覧

## ローカル開発用（`.env.local`）

プロジェクトルートに `.env.local` を作成して設定します。  
このファイルはGitにコミットしないでください（`.gitignore` に含まれています）。

### Cloudflare Workers エンドポイント（必須）

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_HISTORIES_API_ENDPOINT` | 団地の歴史データAPI |
| `NEXT_PUBLIC_CONTENTS_API_ENDPOINT` | コンテンツ取得API |
| `NEXT_PUBLIC_ANNOUNCEMENTS_API_URL` | お知らせAPI |
| `NEXT_PUBLIC_GREENWELLNESS_API_URL` | グリーンウェルネスAPI |
| `NEXT_PUBLIC_CIRCULARS_API_URL` | 回覧板API |
| `NEXT_PUBLIC_MINUTES_API_URL` | 会議情報API |
| `NEXT_PUBLIC_PLACES_API_ENDPOINT` | 周辺施設API |
| `NEXT_PUBLIC_CONTACT_API_URL` | お問い合わせAPI |

> `NEXT_PUBLIC_` プレフィックスが付くものはブラウザ側（クライアントサイド）で使用されます。

### フォーム保護（Cloudflare Turnstile）

| 変数名 | 用途 |
|--------|------|
| `TURNSTILE_SITE_KEY` | Turnstileのサイトキー（お問い合わせフォーム保護） |
| `TURNSTILE_SECRET_KEY` | Turnstileのシークレットキー |

### アクセス解析

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics測定ID |

### Kintone・Google（サーバーサイド処理用）

周辺施設の同期スクリプト（`scripts/sync-places.ts`）でのみ使用。

| 変数名 | 用途 |
|--------|------|
| `GOOGLE_PLACES_API_KEY` | Google Places API キー |
| `KINTONE_DOMAIN` | Kintoneドメイン（`k-miyosino.cybozu.com`） |
| `KINTONE_APP_ID_PLACES` | 周辺施設Kintoneアプリ ID（120） |
| `KINTONE_API_TOKEN_PLACES` | 周辺施設アプリのAPIトークン |
| `KINTONE_APP_ID_HISTORY` | 歴史アプリ ID（121） |
| `KINTONE_API_TOKEN_HISTORY` | 歴史アプリのAPIトークン |

---

## GitHub Secrets（CI/CD用）

GitHub Actionsワークフローで使用するシークレット。  
設定方法は [GitHub Secrets設定](github-secrets.md) を参照してください。

| シークレット名 | 用途 |
|--------------|------|
| `NEXT_PUBLIC_API_ENDPOINT` | 汎用APIエンドポイント |
| `NEXT_PUBLIC_CONTACT_API_URL` | お問い合わせAPI URL |
| `NEXT_PUBLIC_CONTENTS_API_ENDPOINT` | コンテンツAPI URL |
| `NEXT_PUBLIC_HISTORIES_API_ENDPOINT` | 歴史データAPI URL |
| `SAKURA_SSH_HOST` | さくらインターネットSSHホスト |
| `SAKURA_SSH_USERNAME` | さくらインターネットSSHユーザー名 |
| `SAKURA_SSH_KEY` | さくらインターネットSSH秘密鍵 |
| `SAKURA_DEPLOY_PATH` | さくらインターネットデプロイ先パス |
| `GOOGLE_PLACES_API_KEY` | Google Places API キー |
| `KINTONE_DOMAIN` | Kintoneドメイン |
| `KINTONE_APP_ID_PLACES` | 周辺施設アプリID |
| `KINTONE_API_TOKEN_PLACES` | 周辺施設アプリAPIトークン |
