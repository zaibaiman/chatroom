/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  cacheDir: '../../node_modules/.vite/webapp',

  server: {
    port: parseInt(process.env.CLIENT_PORT as string),
    host: process.env.CLIENT_HOST,
  },

  preview: {
    port: parseInt(process.env.CLIENT_PREVIEW_PORT as string),
    host: process.env.CLIENT_HOST,
  },

  plugins: [nxViteTsPaths(), vue(), vueJsx()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
});
