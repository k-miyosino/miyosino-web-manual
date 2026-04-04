---
title: Worker一覧と役割
---

# Worker一覧と役割

## Cloudflare Workers 一覧

| Worker名 | エンドポイント | 役割 |
|---------|--------------|------|
| miyosino-announcements | `NEXT_PUBLIC_ANNOUNCEMENTS_API_URL` | お知らせ取得 |
| miyosino-greenwellness | `NEXT_PUBLIC_GREENWELLNESS_API_URL` | グリーンウェルネス取得 |
| miyosino-circulars | `NEXT_PUBLIC_CIRCULARS_API_URL` | 回覧板取得 |
| miyosino-minutes | `NEXT_PUBLIC_MINUTES_API_URL` | 会議情報取得 |
| miyosino-places-api | `NEXT_PUBLIC_PLACES_API_ENDPOINT` | 周辺施設取得 |
| miyosino-contact-api | `NEXT_PUBLIC_CONTACT_API_URL` | お問い合わせ送信 |
| miyosino-contents-api | `NEXT_PUBLIC_CONTENTS_API_ENDPOINT` | コンテンツ取得 |
| miyosino-histories-api | `NEXT_PUBLIC_HISTORIES_API_ENDPOINT` | 団地の歴史取得 |

## Workers の管理場所

各WorkerはCloudflareダッシュボード（[dash.cloudflare.com](https://dash.cloudflare.com/)）から管理できます。

> **注意:** CloudflareアカウントへのアクセスはGoogle個人アカウントと紐づいている場合があります。  
> 詳細は [Google Cloud属人化課題](../05-known-issues/google-cloud-singlepoint.md) を参照してください。

## 各Workerのソースコード

WorkerのソースコードはGitHubの別リポジトリで管理されています。  
リポジトリ名はIT委員会の引き継ぎ資料を確認してください。
