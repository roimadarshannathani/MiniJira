export default {
  api: {
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/model',
      client: 'react-query',
    },
  },
}