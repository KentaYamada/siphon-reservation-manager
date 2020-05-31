"use strict";

module.exports = {
  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "Cafe de Gamoyon 予約管理システム",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  devServer: {
    port: 8081
  },
  pwa: {
    iconPaths: {
      favicon16:"images/icons/icon-16x16.png", 
      favicon32:"images/icons/icon-32x32.png", 
      appleTouchIcon: "images/icons/icon-152x152.png",
      msTitleImage:"images/icons/icon-144x144.png" 
    }
  }
};
