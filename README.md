# ローカル画像圧縮アプリ

## 概要
ローカルのフォルダにある画像を圧縮するアプリです。

## Setup
初回のみ

```
npm install
```

## 使い方

1. inputフォルダに圧縮したい画像を格納します。
2. 以下のコマンドを実行します。

```
npm start
```

3. outputフォルダに圧縮された画像が格納されます。

## 補足
圧縮用のライブラリは `sharp` を使用しています。
https://www.npmjs.com/package/sharp

画像の圧縮率は`tasks/index.js`の`quality`で設定できます。

```
const quality = 80;
```

対象となる画像の拡張子は`tasks/index.js`の`imageExtensions`で設定できます。

```
const imageExtensions = [".jpg", ".png"];
```