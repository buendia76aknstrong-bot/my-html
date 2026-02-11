# デジタル・レガシー MVP

**「書かずに残す、あなたの人生」**

高齢者が電話で話すだけで、AIが自分史（書籍PDF）を自動作成するB2Cサービスです。

## 機能概要

### MVP機能（3つ）

1. **AI電話インタビュー（入力系）** - 文字起こしデータの入力（MVP時点では手動入力対応）
2. **AI構成・執筆（処理系）** - Claude APIによる5章構成の自分史自動執筆
3. **AIリスクチェック（安全系）** - 第三者リスク・差別リスク・名誉リスクの自動検出・修正

### 画面構成

- **LP（ランディングページ）**: サービス概要、料金、FAQ
- **申込フォーム**: 無料モニター募集
- **管理ダッシュボード**: 顧客管理、原稿生成、リスクチェック、PDF生成

## 技術スタック

- **フロントエンド**: Next.js 16 (TypeScript) + Tailwind CSS v4
- **バックエンド**: Next.js API Routes
- **DB**: PostgreSQL (Prisma ORM)
- **AI**: Claude API (執筆・リスクチェック), Whisper API (文字起こし)
- **PDF**: jsPDF

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

`.env` ファイルを編集し、各APIキーとデータベースURLを設定してください。

### 3. データベースのセットアップ

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## ページ構成

| パス | 説明 |
|------|------|
| `/` | ランディングページ |
| `/apply` | 申込フォーム |
| `/admin` | 管理ダッシュボード |
| `/admin/customers/[id]` | 顧客詳細（インタビュー入力・原稿生成・リスクチェック・PDF生成） |
| `/terms` | 利用規約 |
| `/privacy` | プライバシーポリシー |

## API エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/customers` | 顧客一覧取得 |
| POST | `/api/customers` | 顧客新規登録（申込） |
| POST | `/api/transcribe` | 文字起こしデータ登録 |
| POST | `/api/generate` | 章の原稿生成（Claude API） |
| POST | `/api/risk-check` | リスクチェック実行（Claude API） |
| POST | `/api/pdf` | PDF生成・ダウンロード |
| POST | `/api/feedback` | フィードバック登録 |

## MVP利用フロー

1. LPから無料モニターを申し込む
2. 管理画面で顧客を確認
3. 顧客詳細画面でインタビューテキストを手動入力
4. 各章の原稿を生成（Claude API）
5. 各章のリスクチェックを実行（Claude API）
6. PDFを生成・ダウンロード

## 章構成

| 章 | タイトル | テーマ |
|----|---------|--------|
| 第1章 | はじまりの記憶 | 幼少期〜学生時代 |
| 第2章 | 歩みだした道 | 社会人初期 |
| 第3章 | ともに生きる | 家庭・人間関係 |
| 第4章 | 挑戦と誇り | 仕事の転機 |
| 第5章 | 伝えたいこと | 家族へのメッセージ |

## 必要なAPIキー

- `ANTHROPIC_API_KEY` - Claude API（執筆・リスクチェック）
- `OPENAI_API_KEY` - Whisper API（文字起こし）
- `DATABASE_URL` - PostgreSQL接続URL
