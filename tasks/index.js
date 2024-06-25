// 必要なモジュールを読み込む
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// 画像の圧縮率を定義
const quality = 80;

// 対象とする画像ファイルの拡張子を定義
const imageExtensions = [".jpg", ".png"];

// 入力ディレクトリと出力ディレクトリを定義
const inputDir = "./input"; // 画像が保存されているディレクトリ
const outputDir = "./output"; // 圧縮後の画像を保存するディレクトリ

// 出力ディレクトリを空にする関数（READMEは除く）
const clearOutputDir = () => {
  const files = fs.readdirSync(outputDir);
  files.forEach((fileName) => {
    if (fileName !== "README.md") {
      fs.unlinkSync(path.join(outputDir, fileName));
    }
  });

  console.log("出力ディレクトリを空にしました");
};

// 画像圧縮
const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .jpeg({ quality: quality })
      .png({ quality: quality })
      .toFile(outputPath);
    console.log(`圧縮完了: ${outputPath}`);
  } catch (error) {
    console.error(`エラー: ${error.message}`);
  }
};

// 入力ディレクトリのファイルを1つずつ処理する関数
const imageMinify = () => {
  // 入力ディレクトリのファイル一覧を取得（対象となる拡張子のみ）
  const files = fs
    .readdirSync(inputDir)
    .filter((fileName) =>
      imageExtensions.includes(path.extname(fileName).toLowerCase())
    );

  files.forEach((fileName) => {
    const inputPath = path.join(inputDir, fileName);
    const outputPath = path.join(outputDir, fileName);
    compressImage(inputPath, outputPath);
  });
};

// 画像圧縮処理を実行
clearOutputDir();
imageMinify();
