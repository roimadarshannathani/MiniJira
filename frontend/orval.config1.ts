import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
        target: './src/api/generated.ts',
        client: 'axios',
        mode: 'single',
    },
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
    hooks: {
        afterAllFilesWrite: 'prettier --write ./src/api/**/*.ts'
    }
  }
});
