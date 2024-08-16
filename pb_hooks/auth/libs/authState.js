/// <reference path="../../../pb_data/types.d.ts" />

const {
  getAuthWhitelistedRoutes,
} = require(`${__hooks}/auth/libs/authSettings.js`);
const {
  getAuthContext,
  setAuthContext,
} = require(`${__hooks}/auth/libs/authContext.js`);
const {
  getAuthCookie,
  setAuthCookie,
} = require(`${__hooks}/auth/libs/authCookie.js`);

function getAuthState(ctx) {
  const authRecord = getAuthContext(ctx) ?? getAuthCookie(ctx);
  return authRecord;
}

function setAuthState(ctx, authRecord) {
  try {
    setAuthContext(ctx, authRecord);
    setAuthCookie(ctx, authRecord);
  } catch (err) {
    $app.logger().error("Failed to set auth state", err);
  }
}

function hasAuthState(ctx) {
  const authRecord = getAuthState(ctx);
  return !!authRecord;
}

function refreshAuthState(ctx) {
  const authRecord = getAuthState(ctx);
  if (authRecord) {
    setAuthState(ctx, authRecord);
  }
}

function isWhitelistedRoute(ctx) {
  const routeMatch = ctx.path();
  const whitelistedRoutes = getAuthWhitelistedRoutes();
  return whitelistedRoutes.some((whitelisted) =>
    routeMatch.startsWith(whitelisted)
  );
}

module.exports = {
  getAuthState,
  setAuthState,
  hasAuthState,
  refreshAuthState,
  isWhitelistedRoute,
};
