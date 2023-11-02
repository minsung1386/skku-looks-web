const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:8080' || 'http://localhost:5000',
			changeOrigin: true,
		})
	);
};
