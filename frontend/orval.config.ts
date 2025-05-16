export default {
  api: {
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
    output: {
      target: './src/api2/generated.ts',
      schemas: './src/api/model',
      client: 'react-query',
    },
  },
}