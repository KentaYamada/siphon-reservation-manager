"use strict";

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: "Siphon 予約管理システム",
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  }
};
