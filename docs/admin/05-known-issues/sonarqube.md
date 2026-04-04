---
title: SonarQube
---

# SonarQube

## 概要

SonarQubeはコードの品質・セキュリティを分析するツールです。

> **現在のステータス:** SonarQubeの設定状況はIT委員会の引き継ぎ資料を確認してください。  
> このページは設定が確認でき次第、更新してください。

## 確認が必要な事項

- [ ] SonarQubeのインスタンス（SonarCloud等）の使用有無
- [ ] プロジェクト設定（プロジェクトキー等）
- [ ] GitHub Actionsとの連携有無
- [ ] アカウント情報・管理者

## 一般的なSonarQube連携手順（参考）

GitHub Actionsと連携する場合:

1. SonarCloud等でプロジェクトを作成
2. `SONAR_TOKEN` をGitHub Secretsに追加
3. `.github/workflows/` にSonar分析ワークフローを追加
4. Pull Requestに品質ゲート結果が表示されるようになる

## 現在のコード品質対応

SonarQubeがない場合でも、以下でコード品質を維持しています:
- ESLint 9（静的解析）
- TypeScript（型チェック）
- Husky + lint-staged（コミット前チェック）
