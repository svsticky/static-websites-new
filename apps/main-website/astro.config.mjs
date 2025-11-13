// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'payload/node';

loadEnv();

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["nl", "en"],
    defaultLocale: "nl"
  }
});
