const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3100',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
