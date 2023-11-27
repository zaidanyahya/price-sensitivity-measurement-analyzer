# Price Sensitivity Measurement Analyzer

[![en](https://img.shields.io/badge/lang-en-blue.svg)](/README.md)
[![pt-br](https://img.shields.io/badge/lang-jp-558539.svg)](/README.jp.md)

Price Sensitivity Measurement Analyzer is an analyzer written in TypeScript that provides an easy way to calculate highest, ideal, compromise, and lowest price for a given questionnaire result.

## Installation

This is a TypeScript program written in Node.js environment.

Before installing, download and install the latest version of Node.js.

If you found any problem related with Node.js environment try to use Node.js version 20.9.0.

Installation is done by cloning this repo and install all required packages.

```bash
git clone https://github.com/zaidanyahya/price-sensitivity-measurement-analyzer.git
npm install
```

After installation, if you have npx installed globally on your system you can try to run the following command to calculate PSM using the questionnaire result included in the project files.

```bash
npm start
```

## Usage

First, copy or move your csv file to the project directory Then, run one of the following command.

### Using npx

If you have npx installed globally on your system, you can run the program by following command.

```bash
npx ts-node psm.ts --csvfile PSMRawdata
```

Note: Replace `PSMRawdata` with your csv filename.

### Using ts-node installed globally

Install ts-node globally using the following command.

You can skip this if you already have ts-node installed globally on your system.

```bash
npm install -g ts-node
```

Next, you can run the program by the following command.

```bash
ts-node psm.ts --csvfile PSMRawdata
```

Note: Replace `PSMRawdata` with your csv filename.

### Run manually using path

Additionally, you can also run the program manually using path. After you moved your csv file to the project directory, run the following command.

```bash
.\node_modules\.bin\ts-node psm.ts --csvfile PSMrawdata
```

Note: Replace `PSMRawdata` with your csv filename.

## Expected CSV file content format

This program expecting a csv file with the following content format.

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

## License

[MIT](/LICENSE.md)
