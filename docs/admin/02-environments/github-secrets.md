---
title: GitHub Secrets設定
---

# GitHub Secrets設定

## GitHub Secretsとは

GitHub ActionsワークフローでAPIキーやパスワードを安全に使用するための仕組みです。  
GitHubリポジトリの設定画面から管理します。

## 設定手順

**手順1:** GitHubリポジトリページを開きます。

**手順2:** 「Settings」タブをクリックします。

**手順3:** 左側メニューの「Secrets and variables」→「Actions」をクリックします。

**手順4:** 「New repository secret」ボタンをクリックします。

**手順5:** 「Name」にシークレット名を入力し、「Secret」に値を入力して「Add secret」をクリックします。

## 必要なシークレット一覧

[環境変数一覧](env-vars.md#github-secretscicd用) を参照してください。

## シークレットの更新

既存のシークレットを更新する場合は、シークレット一覧の「Update」ボタンをクリックして新しい値を入力します。

> 古い値を確認することはできません（セキュリティ上の仕様）。更新する場合は新しい値を事前に準備してください。
