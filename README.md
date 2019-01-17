[![npm](https://img.shields.io/npm/v/webpack-chunk-rename-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-chunk-rename-plugin)
[![node](https://img.shields.io/node/v/webpack-chunk-rename-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-chunk-rename-plugin)
# enhanced-webpack-chunk-rename-plugin

This plugin helps with chunk naming in webpack. **To use it you need at least webpack 4.1**  

enhancement

* initial vendor chunks split by `SplitChunksPlugin` will be fine
* initial css chunks split by `MiniCssExtractPlugin` will be fine

## Install
```
npm install webpack-chunk-rename-plugin --save-dev
```
or if you are using yarn
```
yarn add webpack-chunk-rename-plugin --dev
```

## Usage
```javascript
const ChunkRenamePlugin = require("webpack-chunk-rename-plugin");

module.exports = {
  ...
  plugins: [
    new ChunkRenamePlugin(objectWithOptions),
  ],
}
```
Option|Type|Description
--|--|--
`initialChunks`|`boolean\|string`|Rename all chunks which are satisfy the condition ` chunk.isOnlyInitial`. If `true` is passed then use `output.filename` option, if string is passed, use it as chunk name i.e. you can use all placeholder for chunk naming like `[hash]`,`[name]`,`[chunkhash]` etc.
`initialCssChunks`|`string`|Use provided string to rename all initial css chunks split by `MiniCssExtractPlugin`. Just like for previous option, standart placeholders could be used.
`asyncChunks`|`string`|Use provided string to rename all async chunks. Just like for previous option, standart placeholders could be used.
`[chunkName]`|`string`|Use provided string to rename specific chunk.

## Examples
The result of the code below will be: use `filename` option for all chunks with entry and `"specialName.[name].js"` template for mySpecialChunk chunk (assuming you're not using it as a test option for `splitChunks.cacheGroups`).
```javascript
module.exports = {
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  entry: {
    mySpecialChunk: "path/to/my/chunk",
    ....
  },
  ....
  plugins: [
    new ChunkRenamePlugin({
      initialChunks: true,
      mySpecialChunk: "specialName.[name].js",
    }),
  ],
}
```

## Motivation
Currently if you want to move webpack runtime into the separate file you will use [`optimization.runtimeChunk`](https://webpack.js.org/plugins/split-chunks-plugin/#optimization-runtimechunk) option, you all of the chunks, which do not have runtime in them will use `output.chunkFilename` for the filename, event if it contains entry. See [issue](https://github.com/webpack/webpack/issues/6598).  
There are a few plugins for chunk renaming, however i haven't found plugin that is compatible with webpack 4.
