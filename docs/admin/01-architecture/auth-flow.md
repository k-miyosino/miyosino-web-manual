---
title: 認証フロー
---

# 認証フロー

## 認証方式

組合員専用ページはカスタムToken認証を使用しています。  
トークンはブラウザの `localStorage` に保存されます。

## ログインの流れ

```
1. ユーザーがIDとパスワードを入力
2. Cloudflare Workers（認証API）にリクエスト送信
3. Workers側でKintone上の組合員情報と照合
4. 認証成功 → JWTトークンを発行
5. ブラウザのlocalStorageにトークンを保存
6. 組合員専用ページへリダイレクト
```

## 認証チェックの仕組み

組合員専用の各ページは `MemberAuthWrapper` コンポーネントで保護されています。  
ページ表示時にlocalStorageのトークンを確認し、有効でない場合はログインページへリダイレクトします。

## 関連コード（miyosino-webリポジトリ）

- 認証ラッパー: `src/components/member/MemberAuthWrapper.tsx`
- 認証ユーティリティ: `src/utils/auth.ts`（`checkAuthStatus`, `redirectToLogin`, `logout`, `handleAuthCallback`）
- 認証コールバック: `src/app/auth/callback/page.tsx`

## セキュリティ上の注意

- localStorageへのトークン保存はXSS攻撃リスクがあります
- 組合員専用コンテンツは機密性が高くないため、現状の実装で許容しています
- より高いセキュリティが必要になった場合はCookieSameSite設定の検討を推奨します
