/// <reference path="../../pb_data/types.d.ts" />

function requireAuthenticatedMiddleware(next) {
  return (ctx) => {
    const {
      hasAuthState,
      refreshAuthState,
      isWhitelistedRoute,
    } = require(`${__hooks}/auth/libs/authState.js`);
    if (hasAuthState(ctx)) {
      refreshAuthState(ctx);
      return next(ctx);
    }
    if (isWhitelistedRoute(ctx)) {
      return next(ctx);
    }
    const callbackURI = encodeURIComponent(ctx.request().requestURI);
    return ctx.redirect(302, `/auth/sign-in?redirect=${callbackURI}`);
  };
}

function redirectAuthenticatedMiddleware(next) {
  return (ctx) => {
    const { hasAuthState } = require(`${__hooks}/auth/libs/authState.js`);
    if (!hasAuthState(ctx)) {
      return next(ctx);
    }
    return ctx.redirect(302, ctx.queryParamDefault("redirect", "/"));
  };
}

module.exports = {
  requireAuthenticatedMiddleware,
  redirectAuthenticatedMiddleware,
};
