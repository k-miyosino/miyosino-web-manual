---
title: Cloudflare Workers（API）
---

# Cloudflare Workers（API）

## 役割

Cloudflare WorkersはNext.jsフロントエンドとKintoneバックエンドの間に位置するAPIプロキシです。

主な役割:
- Kintone APIキーの秘匿（フロントエンドに直接APIキーを持たせない）
- CORS対応
- データの整形・フィルタリング

## Worker一覧

詳細は [Worker一覧と役割](../04-workers/worker-list.md) を参照してください。

## 管理ツール

Cloudflare Workersの管理には **Wrangler CLI** を使用します。

```bash
# Wranglerのインストール（開発依存関係に含まれています）
npm install

# Workerのローカル実行
npx wrangler dev

# Workerのデプロイ
npx wrangler deploy
```

各WorkerはそれぞれのWorkerリポジトリで管理されています。  
`miyosino-web` リポジトリとは別リポジトリです。

## 注意事項

- CloudflareアカウントはGoogleアカウントと連携している場合があります。  
  引き継ぎ時はアカウント情報の確認が必要です（→ [Google Cloud属人化課題](../05-known-issues/google-cloud-singlepoint.md)）。
