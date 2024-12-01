/// <reference path="../pb_data/types.d.ts" />

require(`${__hooks}/auth/routes.js`);

routerAdd("GET", "/", (event) => {
  const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
  const html = renderPage(event, []);
  return event.html(200, html);
});
