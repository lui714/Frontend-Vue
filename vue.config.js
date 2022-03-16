module.exports = {
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  }
};

module.exports = {
  transpileDependencies: [
    "@splidejs"
  ]
};
  
const path = require('path')


