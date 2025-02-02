const express = require('express');
const fs = require('fs');
const path = require('path');
const { createServer } = require('vite');

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function initServer() {
  const app = express();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    let html;

    if (!isProduction) {
      template = await vite.transformIndexHtml(req.originalUrl, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;
      const { html: appHtml } = await render();
      html = template.replace('<!--main-app-->', appHtml);
    } else {
      html = template;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    res.set({ 'Content-Type': 'text/html' }).end(html);
  });

  return app;
}

initServer().then((app) =>
  app.listen(port, () => {
    console.log(`Express.js running on *:${port}`);
  })
);

