# Claude Code移管ガイド

## 概要

このパッケージは、**「コンサル職限定｜元コンサル1級FPの無料個別相談 powered by Growpal」**のソースコード、ローカルで利用できる画像アセット、ビルド設定、および運用上の引き継ぎ情報をまとめたものです。Manus固有の開発時プラグインと解析スクリプトは移管版から除外しており、一般的なNode.js環境とClaude Codeで扱える構成に整えています。

## 起動手順

Node.js 20以降とpnpmを用意し、このフォルダ直下で以下を実行してください。

```bash
pnpm install
pnpm dev
```

開発サーバーは通常 `http://localhost:5173` で起動します。本番ビルドの確認は以下です。

```bash
pnpm check
pnpm build
pnpm start
```

`pnpm build` は静的フロントエンドを `dist/public` に生成し、`pnpm start` は同フォルダをExpressで配信します。Cloudflare Pages、Vercel、Netlify等の静的ホスティングを使う場合は、SPAのフォールバックを設定してください。

## 構成

| パス | 役割 |
|---|---|
| `client/src/pages/Home.tsx` | LPのセクション順序を定義するページ本体 |
| `client/src/components/` | ヒーロー、FAQ、料金、相談者の声、フォーム等の各セクション |
| `client/src/pages/Booking.tsx` | 個別相談の予約フォームとGoogle Apps Script送信 |
| `client/src/pages/Seminar.tsx` | オンラインセミナーの予約フォームとGoogle Apps Script送信 |
| `client/src/index.css` | 共通配色・タイポグラフィ・Tailwindベーススタイル |
| `client/index.html` | GA4、Clarity、Metaドメイン認証タグ |
| `client/public/assets/` | 本番で参照するローカル画像アセット |
| `assets/original/` | 元画像の保管用。現行UIからは未参照 |
| `server/index.ts` | SPAフォールバックを含む本番用Expressサーバー |

## 外部連携

| 用途 | 実装箇所 | 現在の設定・挙動 |
|---|---|---|
| GA4 | `client/index.html`、各フォーム画面 | 測定ID `G-FCLL609ZTH`。`generate_lead` を送信 |
| Microsoft Clarity | `client/index.html` | プロジェクトID `w3spqrmti4` |
| Metaドメイン認証 | `client/index.html` | `facebook-domain-verification` タグを設定済み |
| 個別相談の予約 | `client/src/pages/Booking.tsx` | Google Apps Scriptへ空き枠取得・予約送信 |
| セミナーの予約 | `client/src/pages/Seminar.tsx` | Google Apps Scriptへ空き枠取得・予約送信 |
| キャリア相談 | `client/src/components/FormSection.tsx` | `https://growpal-inc.com/#contact` へ外部遷移 |
| Growpal公式サイト | Header/Footer | `https://growpal-inc.com` へ外部リンク |

> **注意**：予約ページはGoogle Apps Scriptに `mode: "no-cors"` で送信します。この方式ではブラウザでHTTP応答を読めないため、送信処理の成功判定やGA4イベントの送信タイミングを変更する際は、GAS側の仕様も含めて検証してください。

## コンバージョン計測

| 導線 | GA4イベント名 | `event_label` | 送信タイミング |
|---|---|---|---|
| 個別相談 | `generate_lead` | `individual_consultation` | 予約完了画面の表示直前 |
| オンラインセミナー | `generate_lead` | `seminar_reservation` | 予約完了画面の表示直前 |
| キャリア相談 | `generate_lead` | `career_consultation` | Growpalサイトへの遷移ボタンをクリックした時点 |

## 画像アセット

| ファイル | 状態 | 用途 |
|---|---|---|
| `client/public/assets/two-sword-illustration.webp` | 現行UIで使用中 | `TwoSwordSection.tsx` の二刀流イラスト。1920×1920px |
| `assets/original/IMG_1335.JPG` | 保管用 | 提供された元画像。現行コードからは未参照。600×500px |

以前は二刀流イラストを外部URLで参照していましたが、この移管版ではローカルアセットへ切り替え済みです。これにより、外部アセットURLに依存せず、同じ画像をデプロイできます。

## 移管後に必ず確認すること

| 確認項目 | 確認方法 |
|---|---|
| 主要画面 | `/`、`/booking`、`/seminar` をPC・スマホ幅で確認 |
| 予約導線 | テスト用の入力でGoogle Apps Scriptの受信と完了画面を確認 |
| GA4 | GA4リアルタイムで3種類の `generate_lead` を確認 |
| Clarity | 本番アクセス後にセッションが届くか確認 |
| Meta認証 | Meta Business Managerで対象ドメインの認証状態を確認 |
| SPAルーティング | 直接 `/booking`・`/seminar` を開いても404にならないことを確認 |

## Manus依存の扱い

Manus専用のデバッグ収集プラグイン、Manus解析スクリプト、およびManus用のプロジェクト設定は移管版に含めていません。GA4、Clarity、Metaタグ、およびGoogle Apps Scriptの予約連携は保持しています。移管先のホスティングでアクセス解析を追加する場合は、既存タグを重複させないよう管理してください。
