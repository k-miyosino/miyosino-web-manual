---
title: 新しいWorkerの追加手順
---

# 新しいWorkerの追加手順

新しいKintoneアプリのデータをホームページに表示する場合の手順です。

## 全体の流れ

```
1. Kintoneにアプリを作成（またはAPIトークンを発行）
2. Cloudflare WorkerをDeployする
3. miyosino-webのフロントエンドを実装
4. 環境変数・GitHub Secretsを設定
```

## 手順1: KintoneアプリのAPIトークンを取得

1. Kintone管理画面 → 対象アプリ → アプリの設定 → APIトークン
2. 「生成する」ボタンをクリックしてAPIトークンを生成
3. 必要な権限（レコードの閲覧など）を設定して「保存」

## 手順2: Cloudflare Workerの作成

1. 既存のWorkerを参考にして新しいWorkerを作成します
2. Wrangler CLIでデプロイします

```bash
cd your-worker-directory
npx wrangler deploy
```

3. KintoneのAPIトークン等をWrangler Secretとして設定します

```bash
npx wrangler secret put KINTONE_API_TOKEN
```

## 手順3: フロントエンドの実装

`miyosino-web` リポジトリで以下を実装します。

1. 新しいページ（`src/app/member/new-page/page.tsx`）を作成
2. データ取得コンポーネント（`src/components/member/NewPageContent.tsx`）を作成
3. MemberNavigation（`src/components/member/MemberNavigation.tsx`）にリンクを追加

## 手順4: 環境変数の設定

1. `.env.local` に新しいWorkerのエンドポイントを追加
2. GitHub Secretsに追加（[GitHub Secrets設定](../02-environments/github-secrets.md)）
3. `deploy.yml` のビルドステップに環境変数を追加
