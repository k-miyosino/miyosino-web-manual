---
title: IT委員会向けマニュアル
---

# IT委員会向けマニュアル

かわつる三芳野団地ホームページのシステム構成・運用・保守に関する技術情報をまとめています。

## GitHub組織アカウント

ソースコード・ワークフロー・GitHub Pagesはすべて以下の組織アカウントで管理されています。

| 項目 | URL |
|------|-----|
| GitHub組織アカウント | https://github.com/k-miyosino |
| ホームページリポジトリ | https://github.com/k-miyosino/miyosino-web |
| マニュアルリポジトリ | https://github.com/k-miyosino/miyosino-web-manual |
| ステージング（GitHub Pages） | https://k-miyosino.github.io/miyosino-web/ |
| マニュアルサイト（GitHub Pages） | https://k-miyosino.github.io/miyosino-web-manual/ |

> **引き継ぎ時の注意:** 組織アカウントへのアクセス権（オーナー権限）の移譲が必要です。GitHub の Settings → Members で管理できます。

## このマニュアルの対象者

- IT委員会メンバー
- ホームページの保守・運用を担当する方
- 引き継ぎを受ける方

## 主な内容

| セクション | 内容 |
|-----------|------|
| [システム構成](01-architecture/overview.md) | Next.js・Cloudflare Workers・Kintoneの構成 |
| [環境変数・設定](02-environments/env-vars.md) | 必要な環境変数の一覧と管理方法 |
| [CI/CD・デプロイ](03-cicd/github-actions.md) | GitHub Actionsワークフローとデプロイ手順 |
| [Workers管理](04-workers/worker-list.md) | Cloudflare Workersの一覧と管理方法 |
| [既知の課題](05-known-issues/google-cloud-singlepoint.md) | Google Cloud属人化・SonarQube等の課題 |

## 引き継ぎの際に特に重要なページ

1. [環境変数一覧](02-environments/env-vars.md) — APIキーや認証情報の把握
2. [Google Cloud属人化課題](05-known-issues/google-cloud-singlepoint.md) — 個人アカウント依存のリスク
3. [ブランチ戦略](03-cicd/branch-strategy.md) — develop/staging/mainの運用フロー
