---
title: システム全体像
---

# システム全体像

## 構成図

```
ブラウザ（ユーザー）
    │
    ▼
Next.js 静的サイト（HTML/CSS/JS）
    ├── GitHub Pages（ステージング）
    └── さくらインターネット（本番）
    │
    ▼（APIリクエスト）
Cloudflare Workers（各種APIエンドポイント）
    │
    ▼
Kintone（バックエンドデータストア）
    ├── お知らせ
    ├── 回覧板
    ├── イベント
    ├── 会議情報
    ├── 各種申請
    ├── グリーンウェルネス
    └── 周辺施設（Google Places連携）
```

## 主要コンポーネント

| コンポーネント | 役割 | 技術 |
|--------------|------|------|
| フロントエンド | ページ表示・UI | Next.js 15 + React 19 + Tailwind CSS 4 |
| APIサーバー | Kintoneへのプロキシ・認証 | Cloudflare Workers |
| データストア | コンテンツ管理 | Kintone（k-miyosino.cybozu.com） |
| フォーム保護 | スパム対策 | Cloudflare Turnstile |
| アクセス解析 | Google Analytics | GA4（G-CF38V5SRBT） |

## データフロー

1. ユーザーがブラウザでホームページにアクセス
2. 静的ファイル（HTML/JS）がブラウザに読み込まれる
3. ブラウザのJavaScriptがCloudflare WorkersのAPIを呼び出す
4. CloudflareワーカーがKintone APIにアクセスしてデータを取得
5. ブラウザにデータが返り、ページに表示される

## 認証の仕組み

組合員専用ページのアクセス制御はカスタムToken認証で実現しています。  
詳細は [認証フロー](auth-flow.md) を参照してください。
