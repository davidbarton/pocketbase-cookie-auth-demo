/// <reference path="../pb_data/types.d.ts" />

require(`${__hooks}/auth/routes.js`);

routerAdd("GET", "/", (ctx) => {
  const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
  const html = renderPage(ctx, []);
  return ctx.html(200, html);
});
