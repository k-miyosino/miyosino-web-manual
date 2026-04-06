---
title: MicroCMS（コンテンツストア）
---

# MicroCMS（コンテンツストア）

## 概要

MicroCMSは、株式会社microCMSが提供する日本製のAPIベースのヘッドレスCMSサービスです。サーバー管理が不要で、直感的な管理画面から入稿したデータをAPI経由で配信します。  
以下のページのコンテンツ管理に**現在も使用中**です。

| ページ | 使用箇所 | コンポーネント |
|--------|---------|--------------|
| トップページ | ヒーロー画像 | `HeroSection.tsx` |
| 団地の特徴 | 四季の紹介 | `SeasonsSection.tsx` |
| コミュニティ | 自治会活動 | `CommunityActivities.tsx` |
| コミュニティ | 住民サークル（スポーツ・文化） | `CommunityCircle.tsx` |
| 共有施設・サービス | 共用施設一覧 | `CommonFacilitiesSection.tsx` |
| 共有施設・サービス | サービス一覧 | `ServicesSection.tsx` |

---

## アクセス構造

MicroCMSには**Next.jsから直接アクセスしていません**。  
Cloudflare Workers（`miyosino-contents-api`）がプロキシとして間に入り、APIキーはWorker側で管理されています。

```
ブラウザ（Next.js）
    │
    ▼（NEXT_PUBLIC_CONTENTS_API_ENDPOINT）
Cloudflare Workers（miyosino-contents-api）
    │  MicroCMS APIキーをWorker Secretで保持
    ▼
MicroCMS（コンテンツストア）
    ├── トップ画像
    ├── 四季
    ├── 自治会活動
    ├── 住民サークル（スポーツ・文化）
    ├── 共用施設
    └── サービス
```

---

## 環境変数

Next.js側に必要な環境変数は以下の1つのみです。  
MicroCMSのAPIキーはNext.js側には不要（Worker側で管理）。

| 変数名 | 設定場所 | 内容 |
|--------|---------|------|
| `NEXT_PUBLIC_CONTENTS_API_ENDPOINT` | `.env.local` / GitHub Secrets | `miyosino-contents-api` WorkerのURL |

---

## MicroCMS管理画面

コンテンツの追加・編集・削除はMicroCMS管理画面から行います。

> MicroCMSの管理画面URLとログイン情報はIT委員会の引き継ぎ資料を確認してください。

### コンテンツ種別（APIスキーマ）

MicroCMS上のコンテンツは `category` フィールドでページごとに分類されています。  
カテゴリIDは `src/types/categories.ts`（miyosino-webリポジトリ）で定義されています。

| カテゴリID | 用途 |
|-----------|------|
| `top-image` | トップページのヒーロー画像 |
| `season` | 団地の特徴 > 四季 |
| `community-activities` | コミュニティ > 自治会活動 |
| `community-circle-sports` | コミュニティ > スポーツサークル |
| `community-circle-culture` | コミュニティ > 文化サークル |
| `facility` | 共有施設 > 共用施設 |
| `service` | 共有施設 > サービス |

---

## コンテンツ更新方法

MicroCMSのコンテンツ更新は[運用者向けマニュアル](../../content/index.md)ではなく、  
**MicroCMS管理画面**から直接操作します（Kintoneとは別系統です）。

---

## 注意事項

- MicroCMSのAPIキー管理はWorkerのSecret（Wrangler）で行います。APIキーを再発行した場合はWorkerのSecretも更新が必要です
- MicroCMSのプラン・課金状況はIT委員会で把握・管理してください
