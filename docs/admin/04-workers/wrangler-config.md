---
title: wrangler設定ファイル
---

# wrangler設定ファイル

## 概要

`wrangler.toml`（または `wrangler.jsonc`）はCloudflare WorkersのデプロイにWrangler CLIを使用する際の設定ファイルです。

## 主な設定項目

```toml
name = "miyosino-announcements"       # Worker名
main = "src/index.ts"                 # エントリポイント
compatibility_date = "2024-01-01"     # 互換性日付

[vars]
KINTONE_DOMAIN = "k-miyosino.cybozu.com"
KINTONE_APP_ID = "XXX"
```

## シークレット（機密情報）の設定

APIトークンなどの機密情報は `wrangler.toml` に直接書かずに、Wrangler Secretとして管理します。

```bash
# シークレットの設定
npx wrangler secret put KINTONE_API_TOKEN

# シークレットの一覧確認
npx wrangler secret list

# シークレットの削除
npx wrangler secret delete KINTONE_API_TOKEN
```

設定したシークレットはCloudflareダッシュボードの「Workers & Pages」→ 対象Worker → 「Settings」→「Variables」でも確認できます。

## Workerのデプロイ

```bash
# 本番環境へデプロイ
npx wrangler deploy

# ローカルで動作確認
npx wrangler dev
```
