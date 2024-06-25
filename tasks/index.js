// ライブラリ・モジュールをインポート
const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

// 画像圧縮時の品質設定
const QUALITY = 80;
// 圧縮対象の画像ファイル拡張子
const IMAGE_EXTENSIONS = [".jpg", ".png"];
// 入力ディレクトリのパス
const INPUT_DIR = "./input";
// 出力ディレクトリのパス
const OUTPUT_DIR = "./output";

// 出力ディレクトリ内を空にする関数
const clearOutputDir = async () => {
  try {
    // 出力ディレクトリ内のファイル一覧を取得
    const files = await fs.readdir(OUTPUT_DIR);
    // ファイルを順に削除
    await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(OUTPUT_DIR, fileName);
        await fs.unlink(filePath);
      })
    );
    console.log(`出力ディレクトリ内のファイルをすべて削除しました`);
  } catch (error) {
    console.error(
      `出力ディレクトリのクリア中にエラーが発生しました: ${error.message}`
    );
  }
};

// 画像を圧縮する関数
const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .jpeg({ quality: QUALITY }) // JPEG形式で圧縮
      .png({ quality: QUALITY }) // PNG形式で圧縮
      .toFile(outputPath);
    console.log(`圧縮完了: ${outputPath}`);
  } catch (error) {
    console.error(`画像圧縮エラー: ${error.message}`);
  }
};

// 入力ディレクトリ内の画像ファイルを圧縮して出力ディレクトリに保存する関数
const imageMinify = async () => {
  try {
    // 入力ディレクトリ内のファイル一覧を取得
    const files = await fs.readdir(INPUT_DIR);
    // 処理対象の画像ファイルのみをフィルタリング
    const imageFiles = files.filter((fileName) =>
      IMAGE_EXTENSIONS.includes(path.extname(fileName).toLowerCase())
    );

    // 画像ファイルを順に圧縮
    await Promise.all(
      imageFiles.map(async (fileName) => {
        const inputPath = path.join(INPUT_DIR, fileName);
        const outputPath = path.join(OUTPUT_DIR, fileName);
        await compressImage(inputPath, outputPath);
      })
    );
  } catch (error) {
    console.error(`画像圧縮処理中にエラーが発生しました: ${error.message}`);
  }
};

// 出力ディレクトリをクリア後、画像圧縮処理を実行
const run = async () => {
  await clearOutputDir();
  await imageMinify();
};

// 処理を実行し、エラーがあればコンソールに出力
run().catch(console.error);
