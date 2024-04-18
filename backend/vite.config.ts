/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    setupFiles: ["src/tests/setupDatabase.ts"],
  },
});
