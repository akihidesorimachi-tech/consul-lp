# Claude Code向けプロジェクト指示

このリポジトリは、コンサル職向けの「元コンサル1級FP 無料個別相談」ランディングページです。既存の日本語コピー、GA4イベント名、予約フロー、フォーム送信先は事業運用中のため、変更前に依頼者へ確認してください。

## 開発コマンド

| 目的 | コマンド |
|---|---|
| 依存関係の導入 | `pnpm install` |
| ローカル開発 | `pnpm dev` |
| 型チェック | `pnpm check` |
| 本番ビルド | `pnpm build` |
| 本番プレビュー | `pnpm start` |

## 実装上の重要事項

アプリはReact 19、TypeScript、Vite、Tailwind CSS 4で構成されています。ルーティングはWouterを使用し、`/`、`/booking`、`/seminar` が主要な画面です。LPのセクション構成は `client/src/pages/Home.tsx`、スタイルの共通トークンは `client/src/index.css` を起点に確認してください。

相談予約はGoogle Apps Scriptに直接送信しています。`Booking.tsx` と `Seminar.tsx` の送信方式やpayloadを不用意に変更しないでください。フォーム完了時にはGA4の `generate_lead` を送信し、`event_label` で種別を区別します。キャリア相談はGrowpalの問い合わせページへ外部遷移し、クリック時点で同イベントを送ります。

現在運用中の計測タグは `client/index.html` にあります。GA4測定IDは `G-FCLL609ZTH`、Microsoft Clarity IDは `w3spqrmti4`、Metaドメイン認証タグも同ファイル内です。タグを消去・重複挿入しないでください。

## 画像の取り扱い

運用中の二刀流イラストは `client/public/assets/two-sword-illustration.webp` を使用します。`assets/original/IMG_1335.JPG` は提供された元画像の保管用で、現行UIからは参照していません。画像を差し替える場合は、既存の視覚スタイルとモバイル表示の比率を維持してください。

詳細は `HANDOFF.md` を確認してください。

## GitHub Pages公開時の注意(default branch)

このリポジトリは元々コミットが一つもない空リポジトリでした。空リポジトリに対して `main` 以外のブランチ(例: `claude/...`)へ最初に push すると、GitHub はそのブランチを**default branch**として採用してしまいます。その後 `main` に push しても default branch は自動では戻りません。

`.github/workflows/deploy.yml` による GitHub Pages 公開は、初回デプロイ時に自動作成される `github-pages` 環境の「Deployment branches and tags」設定が、その時点の **default branch** を基準に決まります。default branch が `main` でないと、`main` へのデプロイが拒否され(ワークフローの `deploy` ジョブが即座に失敗し)ます。

そのため、空リポジトリへの初回復元・公開作業では、`main` へ push した後に次を確認してください。

1. リポジトリの Settings → General → Default branch が `main` になっているか確認し、違えば `main` に変更する
2. (すでに `github-pages` 環境が作成されている場合)Settings → Environments → `github-pages` → Deployment branches and tags が `main` を許可しているか確認する

**関連する既知の失敗**: Pages自体が一度も有効化されていないリポジトリでは、`actions/configure-pages@v5` が `Get Pages site failed ... Not Found` で失敗します(default branchの問題とは別物)。これに対応するため `deploy.yml` の `configure-pages@v5` ステップに `enablement: true` を設定し、未有効化時は自動でPagesサイトを作成するようにしています。

## 移管時に変更した点

- Claude Code移管パッケージ(`growpal-lp-claude-code-handoff`)の内容をそのまま復元し、GitHub Pages公開用に以下を追加・調整しました。
  - `vite.config.ts` に `VITE_BASE_PATH` 環境変数によるbase pathの切り替えを追加(プロジェクトページ配下 `/consul-lp/` での配信に対応)。
  - `App.tsx` のwouterルーティングに `import.meta.env.BASE_URL` を基準としたrouter baseを設定。
  - `Booking.tsx`・`Seminar.tsx` の予約完了画面(innerHTMLで生成)内の「LPに戻る」リンクを `import.meta.env.BASE_URL` 基準に変更。
  - `.github/workflows/deploy.yml` を追加(`main` push時にビルドしてGitHub Pagesへ公開)。
- `client/src/components/ManusDialog.tsx` と `client/src/const.ts` の `getLoginUrl` はManus OAuthの名残ですが、`App.tsx` からは参照されておらず未使用です。削除はせずコードとして残しています。
