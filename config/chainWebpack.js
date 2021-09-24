import path from 'path';

export default function chainWebpack(config) {
  config.module
    .rule('lint')
    .test(/\.js(x)?$/)
    .pre()
    .include.add(path.resolve(__dirname, '../src'))
    .end();
  // .use('eslint')
  // .loader('eslint-loader');
}
