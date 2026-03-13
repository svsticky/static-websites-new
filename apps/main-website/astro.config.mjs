// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'payload/node';

import tailwindcss from "@tailwindcss/vite";

loadEnv();

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["nl", "en"],
    defaultLocale: "nl"
  },

  vite: {
    plugins: [tailwindcss()]
  }
});