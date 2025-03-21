# Y.Arai Clone AI アシスタント

このアプリケーションは、RAG を使ったチャット bot アプリケーションです。

## 主な機能

### チャット機能

- AI アシスタントとリアルタイムでチャットが可能
- 会話履歴の表示
- レスポンシブデザイン対応

### 管理機能

- AI の学習データを管理
- テキストデータの登録
- PDF ファイルからの学習データ抽出

## 技術スタック

- フロントエンド

  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui

- バックエンド
  - OpenAI API
  - Supabase
  - Embeddings 技術を活用した類似文書検索

## 使い方

1. ホーム画面から「Y.Arai Clone とチャットを始める」をクリック
2. チャット画面でメッセージを入力
3. AI アシスタントからの応答を受け取る

管理者の場合：

1. ホーム画面から「管理画面へ」をクリック
2. テキストまたは PDF ファイルで学習データを登録可能

## イメージ動画

https://github.com/mrs-y-arai/my-clone-chatbot/blob/main/public/chat.mp4

![イメージ動画](./public/chat.mp4)
