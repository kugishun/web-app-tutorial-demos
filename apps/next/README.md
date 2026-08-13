# Focus Board Next

Vanilla JavaScript版・React版と同じタスク管理機能を、TypeScriptとNext.js App Routerで実装した比較学習用アプリです。

## 起動方法

リポジトリルートで次を実行します。

```bash
pnpm install
pnpm dev:next
```

`apps/next`ディレクトリ内から起動する場合は、次のコマンドも利用できます。

```bash
pnpm dev
```

ブラウザで`http://localhost:3000`を開きます。

## ページ

- `/`：技術ごとの役割を説明するServer Component
- `/tasks`：タスク管理アプリを表示するページ

## 学習ポイント

- `Task`型によるデータ構造の明文化
- App Routerによるファイルベースルーティング
- `layout.tsx`による共通レイアウト
- Server ComponentからClient Componentを呼び出す構成
- `'use client'`による境界
- Client Component内でのState、イベント、localStorage
- `Metadata`によるページ情報の設定

## 主なファイル

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── tasks/
│       ├── page.tsx
│       └── task-board.tsx
├── components/
├── lib/tasks.ts
└── types/task.ts
```
