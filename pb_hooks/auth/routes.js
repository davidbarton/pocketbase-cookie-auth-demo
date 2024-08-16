/// <reference path="../../pb_data/types.d.ts" />

const {
  requireAuthenticatedMiddleware,
  redirectAuthenticatedMiddleware,
} = require(`${__hooks}/auth/middleware.js`);

routerUse(requireAuthenticatedMiddleware);

routerAdd(
  "GET",
  "/auth/sign-up",
  (ctx) => {
    const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
    const html = renderPage(ctx, [`${__hooks}/auth/views/sign-up.html`]);
    return ctx.html(200, html);
  },
  redirectAuthenticatedMiddleware
);

routerAdd("POST", "/auth/sign-up", (ctx) => {
  const { upsertAuthRecord } = require(`${__hooks}/auth/libs/authRecord.js`);
  const { setAuthState } = require(`${__hooks}/auth/libs/authState.js`);
  try {
    const authRecord = upsertAuthRecord(ctx);
    setAuthState(ctx, authRecord);
    return ctx.redirect(302, ctx.queryParamDefault("redirect", "/"));
  } catch (err) {
    return ctx.noContent(204);
  }
});

routerAdd(
  "GET",
  "/auth/sign-in",
  (ctx) => {
    const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
    const html = renderPage(ctx, [`${__hooks}/auth/views/sign-in.html`]);
    return ctx.html(200, html);
  },
  redirectAuthenticatedMiddleware
);

routerAdd("POST", "/auth/sign-in", (ctx) => {
  const {
    getAuthRecordByPassword,
  } = require(`${__hooks}/auth/libs/authRecord.js`);
  const { setAuthState } = require(`${__hooks}/auth/libs/authState.js`);
  try {
    const authRecord = getAuthRecordByPassword(ctx);
    setAuthState(ctx, authRecord);
    return ctx.redirect(302, ctx.queryParamDefault("redirect", "/"));
  } catch (err) {
    return ctx.noContent(204);
  }
});

routerAdd("GET", "/auth/sign-out", (ctx) => {
  const { setAuthState } = require(`${__hooks}/auth/libs/authState.js`);
  setAuthState(ctx, null);
  return ctx.redirect(302, ctx.queryParamDefault("redirect", "/"));
});
