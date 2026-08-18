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

## 公開先

このリポジトリはRailwayと連携済みで、Railway上でホスティングします(GitHub Pagesではありません)。ビルドは `pnpm build`、起動は `pnpm start`(`server/index.ts` をesbuildでバンドルしたExpressサーバーが `dist/public` を配信し、SPAフォールバックも兼ねます)。`vite.config.ts` の `base` はルート(`/`)固定で問題ありません。

`Booking.tsx`・`Seminar.tsx` はカレンダー空き状況の取得・予約送信のどちらもGAS(Google Apps Script)のWeb App URLへブラウザから直接fetchする構成で、`server/`側にはtRPCやDB連携などのAPI層は一切ありません(`doctor-lp`・`kanbe-lp`の個別相談予約ページとは異なり、`server/routers.ts`のようなものはこのリポジトリには存在しません)。この構成自体はRailway・静的ホスティングのどちらでも動作しますが、今回はRailway連携済みのためRailwayを使います。

## 移管時に変更した点

- Claude Code移管パッケージ(`growpal-lp-claude-code-handoff`)の内容をそのまま復元しました。
- `client/src/components/ManusDialog.tsx` と `client/src/const.ts` の `getLoginUrl` はManus OAuthの名残ですが、`App.tsx` からは参照されておらず未使用です。削除はせずコードとして残しています。
