import { defineConfig } from 'umi';
import chainWebpack from './chainWebpack';

const { CLIENT_URL } = process.env;

export default defineConfig({
  proxy: {},
  chainWebpack,
});
