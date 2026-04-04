---
title: Kintone（バックエンド）
---

# Kintone（バックエンド）

## 概要

- **ドメイン:** `k-miyosino.cybozu.com`
- **用途:** ホームページに表示するコンテンツの管理・保存

## Kintoneアプリ一覧

| アプリID | 用途 | 環境変数 |
|---------|------|---------|
| 120 | 周辺施設（Google Places連携） | `KINTONE_APP_ID_PLACES` |
| 121 | 団地の歴史 | `KINTONE_APP_ID_HISTORY` |
| その他 | お知らせ・回覧板・イベント等 | Workers側で管理 |

> お知らせ・回覧板・イベント・会議・申請・グリーンウェルネスのアプリIDとAPIトークンは、各Cloudflare Workerの環境変数（Wrangler Secret）で管理されています。

## Kintone管理画面へのアクセス

[Kintone管理画面](https://k-miyosino.cybozu.com/) にログインして操作します。  
コンテンツ更新の手順は [コンテンツ更新者向けマニュアル](../../content/index.md) を参照してください。

## APIトークンについて

各アプリのAPIトークンはKintone管理画面の「アプリの設定」→「APIトークン」で確認・再発行できます。

> APIトークンを再発行した場合は、対応するCloudflare WorkerのSecretも更新が必要です。

## Google Places API連携（周辺施設）

周辺施設情報はGoogle Places APIとKintoneアプリ（#120）を同期するGitHub Actionsワークフロー（`sync.yml`）で管理されています。

- 実行スケジュール: 毎週月曜 AM 3:00 JST（日曜 18:00 UTC）
- 手動実行も可能（GitHub Actions → sync.yml → Run workflow）
