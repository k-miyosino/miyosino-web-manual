---
title: GitHub Pagesデプロイ（ステージング）
---

# GitHub Pagesデプロイ（ステージング）

## 概要

`staging` ブランチへのpushで自動的にGitHub Pagesへデプロイされます。

## GitHub Pages設定の確認

1. GitHubリポジトリの「Settings」→「Pages」を開きます
2. 「Source」が「GitHub Actions」になっていることを確認します

## デプロイの確認

1. GitHubリポジトリの「Actions」タブを開きます
2. 最新の「Deploy」ワークフローをクリックします
3. すべてのジョブが「✓」（緑のチェック）になっていればデプロイ成功です
4. ステージングURLでホームページが表示されることを確認します

## デプロイが失敗した場合

1. 失敗したジョブをクリックしてエラーログを確認します
2. よくある原因:
   - GitHub Secretsの設定漏れ・値の間違い
   - `npm run build` でのビルドエラー（TypeScriptエラー等）
   - GitHub Pages の設定が正しくない

## ステージングURL

**https://k-miyosino.github.io/miyosino-web/**

GitHubの組織アカウント [k-miyosino](https://github.com/k-miyosino) のGitHub Pagesとして公開されています。
