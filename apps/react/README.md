# Focus Board React

Vanilla JavaScript版と同じ機能をReactで再構築した、比較学習用のブラウザアプリです。

## 起動方法

```bash
pnpm install
pnpm dev
```

本番用ファイルは次のコマンドで作成できます。

```bash
pnpm build
```

## 実装している機能

- タスクの追加、編集、削除
- 完了状態の切り替え
- 優先度と期限の設定
- キーワード検索
- 状態と優先度による絞り込み
- 作成日、期限、優先度による並び替え
- 完了済みタスクの一括削除
- 進捗と件数の表示
- localStorageへの保存
- デモデータのリセット

## Reactでの構成

- `App`がアプリ全体のタスクと絞り込み条件をStateとして管理する
- `Summary`がタスクから件数と進捗を計算する
- `TaskForm`が入力中の値をローカルStateとして管理する
- `TaskFilters`が絞り込み条件をPropsで受け取る
- `TaskList`がタスク配列からUIを宣言する
- `EditDialog`が編集中の値をローカルStateとして管理する
- `useEffect`がタスク変更時のlocalStorage保存を担当する
- `useMemo`が検索、絞り込み、並び替え結果を計算する

## 比較するポイント

- DOMを直接生成・更新する処理がなくなっていること
- Stateの変更から表示が再計算されること
- UIのまとまりがコンポーネントとして分割されていること
- Propsを通してデータと操作が親から子へ渡されること
- localStorageへの保存が画面更新処理から分離されていること
