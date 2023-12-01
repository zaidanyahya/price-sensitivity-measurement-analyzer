# 価格感度分析(PSM分析)プログラム

[![en](https://img.shields.io/badge/lang-en-blue.svg)](/README.en.md)
[![pt-br](https://img.shields.io/badge/lang-jp-558539.svg)](/README.md)

Price Sensitivity Measurement AnalyzerはTypeScriptで書かれたPSM分析プログラムで、与えられたアンケート結果に対する最高価格、理想価格、妥協価格、最低価格を簡単に計算する方法を提供します。

## インストール

このプログラムは Node.js 環境で書かれた TypeScript プログラムです。

インストールする前に、最新安定版の Node.js をダウンロードしてインストールしてください。

Node.js 環境に関する問題が見つかった場合は、Node.js バージョン 20.9.0 を使用してみてください。

このプログラムのインストールは、次のコマンドでこのリポジトリをクローンし、必要なパッケージをすべてインストールすることで行います。

```bash
git clone https://github.com/zaidanyahya/price-sensitivity-measurement-analyzer.git
cd price-sensitivity-measurement-analyzer
npm install
```

インストール後、npx が既にグローバルにインストールされている場合は、以下のコマンドを実行することで、プロジェクトファイルに含まれるアンケート結果を使用してPSM分析をすることができます。

```bash
npm start
```

## 使用方法

まず、csv ファイルをプロジェクト・ダイレクトリに移動し、ターミナル上でプロジェクト・ダイレクトリに移動します。その上で、
次の中からどちらかを実行してください。

### npx を用いる方法

npx が既にグローバルにインストールされている場合は、以下のコマンドでプログラムを実行することができます。

```bash
npx ts-node psm.ts --csvfile PSMRawdata
```

注: `PSMRawdata` は csv ファイル名に置き換えてください。

### グローバルにインストールされた ts-node を用いる方法

ts-node を グローバルにインストールするためには、以下のコマンドで実行できます。
ts-node が既に、グローバルにインストールされている場合、以下のコマンドをスキップしても大丈夫です。

```bash
npm install -g ts-node
```

次は、以下のコマンドでプログラムを実行することができます。

```bash
ts-node psm.ts --csvfile PSMRawdata
```

注: `PSMRawdata` は csv ファイル名に置き換えてください。

### パスを使って手動で実行する方法

パスを使って手動でプログラムを実行することもできます。以下のコマンドで実行できます。

```bash
.\node_modules\.bin\ts-node psm.ts --csvfile PSMrawdata
```

注: `PSMRawdata` は csv ファイル名に置き換えてください。

## 期待される CSV ファイルの内容形式

このプログラは以下の CSV ファイルの内容形式を期待します。

```
sample number,高い,安い,高すぎる,安すぎる
1,500,250,500,200
2,358,198,398,88
3,300,200,350,150
...
...
...
34,380,300,400,300
35,500,300,600,200
36,475,350,600,350
```

## ライセンス

[MIT](/LICENSE.md)
