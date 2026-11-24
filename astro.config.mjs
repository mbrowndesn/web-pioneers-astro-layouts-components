// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  build: {
    // Emit pioneers/eric-meyer.html rather than pioneers/eric-meyer/index.html,
    // so links between pages also work when the built site is opened from disk
    format: 'file',
    // Inline CSS so the built pages are styled even when opened from disk
    inlineStylesheets: 'always'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [markdoc()]
});
