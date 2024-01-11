/*
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_FIREBASE_API_KEY: JSON.stringify(process.env.VUE_APP_FIREBASE_API_KEY),
          VUE_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.VUE_APP_FIREBASE_AUTH_DOMAIN),
          VUE_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_PROJECT_ID),
          VUE_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.VUE_APP_FIREBASE_STORAGE_BUCKET),
          VUE_APP_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID),
          VUE_APP_FIREBASE_APP_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_APP_ID),
          VUE_APP_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MEASUREMENT_ID)
          // ... 기타 환경 변수
        }
      })
    ]
  }
});
*/

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
