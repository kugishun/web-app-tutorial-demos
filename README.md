# Web App Tutorial Demos

同じタスク管理アプリをVanilla JavaScriptとReactで実装し、UI開発における設計の違いを比較するための教材リポジトリです。

## アプリ

| アプリ | ディレクトリ | 学習する内容 |
| --- | --- | --- |
| Vanilla JavaScript版 | `apps/vanilla-js` | DOM操作、イベント処理、状態と画面の手動同期 |
| React版 | `apps/react` | コンポーネント、Props、State、宣言的UI |

両方のアプリは、タスクの追加・編集・削除・完了、検索、絞り込み、並び替え、localStorageへの保存に対応しています。

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

## 両方をビルド

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
│   └── react/
│       ├── src/
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
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
