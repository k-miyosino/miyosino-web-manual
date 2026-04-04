---
title: システム全体像
---

# システム全体像

## 構成図（通常のデータフロー）

```
ブラウザ（ユーザー）
    │
    ▼
Next.js 静的サイト（HTML/CSS/JS）
    ├── GitHub Pages（ステージング）
    └── さくらインターネット（本番）
    │
    ├─────────────────────────────────────┐
    ▼（contents-api）                     ▼（その他Workers）
Cloudflare Workers                   Cloudflare Workers
（miyosino-contents-api）            （各種APIエンドポイント）
    │                                     │
    ▼                                     ▼
MicroCMS                             Kintone（バックエンドデータストア）
    ├── トップ画像                        ├── お知らせ
    ├── 四季                             ├── 回覧板
    ├── 自治会活動                        ├── イベント
    ├── 住民サークル                      ├── 会議情報
    ├── 共用施設                          ├── 各種申請
    └── サービス                         ├── グリーンウェルネス
                                         └── 周辺施設（アプリ #120）
```

## 構成図（周辺施設データ定期同期）

周辺施設情報のみ、Google Cloud（Places API）から定期的に取得してKintoneに書き込む別フローがあります。

```
GitHub Actions（sync.yml）
    │  毎週月曜 AM 3:00 JST に自動実行
    │  （手動実行も可能）
    ▼
Google Cloud Places API
    │  周辺施設の名称・住所・カテゴリ等を取得
    ▼
scripts/sync-places.ts（同期スクリプト）
    │  取得データを整形・差分チェック
    ▼
Kintone（アプリ #120 / 周辺施設）
    │  レコードを追加・更新・削除
    ▼
Cloudflare Workers（miyosino-places-api）
    │  ホームページからのリクエスト時に読み出し
    ▼
ホームページ「周辺施設」ページに表示
```

詳細は [周辺施設データ同期（sync-places）](sync-places.md) を参照してください。

## 主要コンポーネント

| コンポーネント | 役割 | 技術 |
|--------------|------|------|
| フロントエンド | ページ表示・UI | Next.js 15 + React 19 + Tailwind CSS 4 |
| APIサーバー（コンテンツ） | MicroCMSへのプロキシ | Cloudflare Workers（miyosino-contents-api） |
| APIサーバー（組合員情報） | Kintoneへのプロキシ・認証 | Cloudflare Workers（各種） |
| コンテンツストア | ヒーロー画像・コミュニティ・施設等 | MicroCMS |
| データストア | 組合員向け情報管理 | Kintone（k-miyosino.cybozu.com） |
| 周辺施設同期 | Google Places → Kintone定期同期 | GitHub Actions + scripts/sync-places.ts |
| フォーム保護 | スパム対策 | Cloudflare Turnstile |
| アクセス解析 | Google Analytics | GA4（G-CF38V5SRBT） |

> **MicroCMSとKintoneの使い分け:** 公開ページのコンテンツ（画像・施設説明等）はMicroCMS、組合員専用ページの情報（お知らせ・回覧板等）はKintoneで管理しています。詳細は [MicroCMS](../05-known-issues/microcms.md) を参照してください。

## 通常のデータフロー

1. ユーザーがブラウザでホームページにアクセス
2. 静的ファイル（HTML/JS）がブラウザに読み込まれる
3. ブラウザのJavaScriptがCloudflare WorkersのAPIを呼び出す
4. CloudflareワーカーがKintone APIにアクセスしてデータを取得
5. ブラウザにデータが返り、ページに表示される

## 認証の仕組み

組合員専用ページのアクセス制御はカスタムToken認証で実現しています。  
詳細は [認証フロー](auth-flow.md) を参照してください。
