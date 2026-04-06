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

## リリースまでの流れ

ソースの修正から本番公開までは、以下の流れで進めます。

```
ローカル修正・確認
    ↓
develop ブランチ（PR マージ）
    ↓
staging ブランチ → 自動デプロイ → GitHub Pages（全員で確認）
    ↓
main ブランチ → 自動デプロイ → 本番環境（さくらインターネット）
```

1. **ローカルで修正・確認** — `npm run dev` で開発サーバーを起動し、ブラウザで動作確認します
2. **develop ブランチにマージ** — 問題なければ GitHub で Pull Request を作成し、`develop` ブランチへマージします
3. **staging ブランチにマージして push** — `develop` を `staging` ブランチにマージし、リモートへ push します
4. **GitHub Pages へ自動デプロイ** — push をトリガーに GitHub Actions が自動でビルド・デプロイします
5. **ステージングで全員確認** — ステージングURL（GitHub Pages）をメンバー全員で確認します
6. **main ブランチにマージして push** — 問題なければ `staging` を `main` ブランチにマージし、リモートへ push します
7. **本番環境へ自動デプロイ** — push をトリガーに GitHub Actions が自動でビルド・本番環境へデプロイします

---

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
