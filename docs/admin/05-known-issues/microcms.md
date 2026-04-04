---
title: MicroCMS
---

# MicroCMS

## 概要

MicroCMSはヘッドレスCMSサービスです。以前はコンテンツ管理にMicroCMSを使用していましたが、現在は**Cloudflare Workers + Kintone**に移行しています。

## 現在のステータス

- `.env.local` にMicroCMSの設定がコメントアウトされた状態で残っています
- 現在のホームページはCloudflare WorkersのAPIを優先して使用しています
- MicroCMSは現在使用していません（廃止・移行済み）

## コメントアウトされた設定（`.env.local`）

```bash
# MicroCMS設定（現在未使用 - Cloudflare Workersに移行済み）
# MICROCMS_SERVICE_DOMAIN=...
# MICROCMS_API_KEY=...
```

## MicroCMSアカウントについて

MicroCMSのアカウントが残っている場合は、以下を確認してください。

- [ ] MicroCMSのアカウントが存在するか
- [ ] 課金されていないか（無料プランの場合は問題なし）
- [ ] 不要であれば解約・削除を検討

## 削除手順（コードクリーンアップ）

将来的にコードからMicroCMS関連の記述を完全に削除する場合:

1. `.env.local` からMicroCMS関連のコメント行を削除
2. `package.json` にMicroCMS SDKが残っていれば削除（現在は含まれていません）
3. コンポーネント内にMicroCMSへの参照が残っていればGrep検索して削除
