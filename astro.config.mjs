// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }

  },
  image: {
    domains: ['www.kindpng.com', 'www.pngmart.com', 'images.pexels.com'],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});