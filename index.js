class EnhancedChunksRenamePlugin {
  constructor(chunksToRename = {}) {
    Object.keys(chunksToRename).forEach(key => {
      this[key] = chunksToRename[key];
    });
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "EnhancedChunksRenamePlugin",
      (compilation, { normalModuleFactory }) => {
        compilation.chunkTemplate.hooks.renderManifest.tap(
          "EnhancedChunksRenamePlugin",
          (result, options) => {
            const chunk = options.chunk;
            const outputOptions = options.outputOptions;

            if (
              this.initialChunks &&
              // chunk.hasEntryModule() && 去掉该条件判断使得 SplitChunksPlugin 生成的 vendors chunk 依然有效
              chunk.isOnlyInitial()
            ) {
              this.initialCssChunks&&result&&result.forEach((obj)=>{
                  if (obj.pathOptions.contentHashType === "css/mini-extract") {
                    obj.filenameTemplate = this.initialCssChunks;
                  }
                });
              chunk.filenameTemplate =
                typeof this.initialChunks === "boolean"
                  ? outputOptions.filename
                  : this.initialChunks;
            }
            if (this.asyncChunks && !chunk.isOnlyInitial()) {
              chunk.filenameTemplate = this.asyncChunks;
            }
            if (
              this.hasOwnProperty(chunk.name) &&
              typeof this[chunk.name] === "string"
            ) {
              chunk.filenameTemplate = this[chunk.name];
            }
          }
        );
      }
    );
  }
}

module.exports = EnhancedChunksRenamePlugin;
