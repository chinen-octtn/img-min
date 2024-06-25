# ローカル画像圧縮アプリ

## 概要

ローカルのフォルダにある画像を圧縮するアプリです。

### 動作確認環境

- macOS Sonoma 14.5
- Node.js v20.10.0
- npm 10.2.3

## Setup

初回のみ

```
npm install
```

## 使い方

1. `input` フォルダに圧縮したい画像を格納します。
2. 以下のコマンドを実行します。

```
npm start
```

3. `output` フォルダに圧縮された画像が格納されます。

## 補足

圧縮用のライブラリは `sharp` を使用しています。
https://www.npmjs.com/package/sharp

画像の圧縮率は`tasks/index.js`の`QUALITY`で設定できます。

```
const QUALITY = 80;
```

対象となる画像の拡張子は`tasks/index.js`の`IMAGE_EXTENSIONS`で設定できます。

```
const IMAGE_EXTENSIONS = [".jpg", ".png"];
```
