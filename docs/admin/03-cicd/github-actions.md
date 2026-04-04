---
title: GitHub Actionsワークフロー
---

# GitHub Actionsワークフロー

## ワークフロー一覧

| ファイル | トリガー | 処理 |
|---------|---------|------|
| `deploy.yml` | develop/staging/mainへのpush | ビルド・デプロイ |
| `sync.yml` | 毎週日曜18:00 UTC・手動 | Google Places → Kintone同期 |

## deploy.yml の動作

### ブランチごとの動作

| ブランチ | ビルド | デプロイ先 |
|---------|--------|-----------|
| `develop` | スキップ | なし |
| `staging` | 実行 | GitHub Pages |
| `main` | 実行 | さくらインターネット（現在停止中） |

### 処理フロー

```
push to staging
    ↓
1. Checkout（ソースコード取得）
2. Node.js 20 セットアップ
3. npm ci（依存関係インストール）
4. npm run build（Next.jsビルド）
   ※ 環境変数はGitHub Secretsから注入
5. out/ ディレクトリをアーティファクトとしてアップロード
6. GitHub Pagesへデプロイ
```

### 本番デプロイについて

`deploy-sakura` ジョブは現在 `if: false` で無効化されています。  
本番デプロイを再開する場合は、`deploy.yml` の該当行を変更し、さくらインターネットのSSH設定（GitHub Secrets）が正しく設定されているか確認してください。

## sync.yml の動作

周辺施設データをGoogle Places APIからKintoneに同期します。

- **スケジュール:** 毎週月曜 AM 3:00 JST（日曜 18:00 UTC）
- **手動実行:** GitHub Actions画面から「Run workflow」で任意実行可能
- **処理:** `scripts/sync-places.ts` スクリプトを実行
