import { defineConfig } from 'umi';
import theme from './theme';

const { BASE_URL } = process.env;

export default defineConfig({
  base: BASE_URL,
  title: 'superTiger_y',
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  theme,
});
