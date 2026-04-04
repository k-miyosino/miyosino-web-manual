---
title: ローカル開発環境構築
---

# ローカル開発環境構築

## 必要なツール

| ツール | バージョン | 用途 |
|--------|-----------|------|
| Node.js | 20.x以上 | JavaScriptランタイム |
| npm | 10.x以上 | パッケージ管理 |
| Git | 最新 | ソース管理 |

## セットアップ手順

**手順1:** リポジトリをクローンします。

```bash
git clone https://github.com/anorimura-miyosino/miyosino-web.git
cd miyosino-web
```

**手順2:** 依存関係をインストールします。

```bash
npm ci
```

**手順3:** `.env.local` ファイルを作成します。

```bash
cp .env.local.example .env.local  # 例ファイルがある場合
# または手動で作成し、環境変数を設定する
```

環境変数の詳細は [環境変数一覧](env-vars.md) を参照してください。

**手順4:** 開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くとホームページが表示されます。

## よく使うコマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド（out/ ディレクトリに出力）
npm run lint     # ESLintチェック
npm run format   # Prettierでコード整形
```
