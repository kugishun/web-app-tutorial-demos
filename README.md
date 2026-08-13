# Web App Tutorial Demos

同じタスク管理アプリをVanilla JavaScript、React、Next.jsで実装し、言語・UIライブラリ・フレームワークによる設計の違いを比較するための教材リポジトリです。

## アプリ

| アプリ | ディレクトリ | 学習する内容 |
| --- | --- | --- |
| Vanilla JavaScript版 | `apps/vanilla-js` | DOM操作、イベント処理、状態と画面の手動同期 |
| React版 | `apps/react` | コンポーネント、Props、State、宣言的UI |
| Next.js版 | `apps/next` | TypeScript、App Router、Server/Client Components |

3つのアプリは、タスクの追加・編集・削除・完了、検索、絞り込み、並び替え、localStorageへの保存に対応しています。

## 必要な環境

- Node.js
- pnpm

## セットアップ

```bash
pnpm install
```

## Vanilla JavaScript版

```bash
pnpm dev:vanilla
```

## React版

```bash
pnpm dev:react
```

## Next.js版

リポジトリルートから起動する場合:

```bash
pnpm dev:next
```

`apps/next`ディレクトリへ移動して直接起動する場合:

```bash
cd apps/next
pnpm dev
```

起動後、ブラウザで`http://localhost:3000`を開きます。

## すべてをビルド

```bash
pnpm build
```

## ディレクトリ構成

```text
.
├── apps/
│   ├── vanilla-js/
│   │   ├── src/
│   │   ├── index.html
│   │   └── package.json
│   ├── react/
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   └── next/
│       ├── src/app/
│       ├── src/components/
│       ├── package.json
│       └── next.config.ts
├── package.json
└── pnpm-workspace.yaml
```

## 比較の観点

- データを変更したときに画面を更新する方法
- DOMを直接操作するコードの有無
- UIを分割する単位
- 状態を保持する場所
- データと操作を子要素へ渡す方法
- localStorageへの保存処理と画面更新処理の関係
- 機能追加時に変更が必要になる範囲
- JavaScriptとTypeScriptによるデータ仕様の表現方法
- ReactとNext.jsの役割の違い
- Server ComponentとClient Componentの境界
