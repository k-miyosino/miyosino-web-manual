---
title: ブランチ戦略
---

# ブランチ戦略

## ブランチ構成

```
main        ← 本番環境（さくらインターネット）
  ↑
staging     ← ステージング環境（GitHub Pages）
  ↑
develop     ← 開発ブランチ（デプロイなし）
  ↑
feature/xxx ← 機能開発・バグ修正ブランチ（都度作成）
```

## 開発フロー

**1. 作業ブランチの作成**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

**2. 開発・コミット**

```bash
# 変更を加えてコミット
git add src/components/MyComponent.tsx
git commit -m "feat: Add MyComponent"
```

コミット時にHusky（Git Hooks）が自動でESLint・Prettierを実行します。

**3. developへのマージ**

GitHubでPull Requestを作成し、レビュー後にdevelopへマージします。

**4. ステージング確認**

```bash
git checkout staging
git merge develop
git push origin staging
```

GitHub Actionsが自動でビルド・GitHub Pagesへデプロイします。  
ステージングURL（GitHub Pages）で動作確認します。

**5. 本番リリース**

```bash
git checkout main
git merge staging
git push origin main
```

> 本番デプロイは現在一時停止中です。`deploy.yml` の `if: false` を変更して有効化してください。

## コミットメッセージの規則

Conventional Commitsに準拠します。

| プレフィックス | 用途 |
|-------------|------|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `style:` | スタイル変更（機能変更なし） |
| `refactor:` | リファクタリング |
| `docs:` | ドキュメント変更 |
| `chore:` | その他（設定変更など） |
