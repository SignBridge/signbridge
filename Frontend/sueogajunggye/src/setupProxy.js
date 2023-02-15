const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/recording/analyze',
    createProxyMiddleware({
      target: 'https://i8d204.p.ssafy.io',
      changeOrigin: true,
    })
 );
};