/// <reference path="../../pb_data/types.d.ts" />

function refreshAuthMiddleware() {
  return (event) => {
    const {
      refreshAuthState,
      getAuthRecordFromCookie,
    } = require(`${__hooks}/auth/libs/authRecord.js`);
    const authRecord = event.auth ?? getAuthRecordFromCookie(event);
    if (authRecord) {
      refreshAuthState(event, authRecord);
    }
    return event.next();
  };
}

function requireAuthMiddleware() {
  return (event) => {
    const {
      WHITELISTED_ROUTES,
      isRouteMatch,
      getGuestRedirectURI,
    } = require(`${__hooks}/auth/libs/routing.js`);
    if (
      !!event.auth ||
      isRouteMatch(event.request.url.path, WHITELISTED_ROUTES)
    ) {
      return event.next();
    }
    return event.redirect(302, getGuestRedirectURI(event));
  };
}

function requireGuestMiddleware() {
  return (event) => {
    const {
      GUEST_ROUTES,
      isRouteMatch,
      getAuthRedirectURI,
    } = require(`${__hooks}/auth/libs/routing.js`);
    if (!!event.auth && isRouteMatch(event.request.url.path, GUEST_ROUTES)) {
      return event.redirect(302, getAuthRedirectURI(event));
    }
    return event.next();
  };
}

module.exports = {
  refreshAuthMiddleware,
  requireAuthMiddleware,
  requireGuestMiddleware,
};
