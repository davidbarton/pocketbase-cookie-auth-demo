/// <reference path="../../pb_data/types.d.ts" />

const {
  refreshAuthMiddleware,
  requireAuthMiddleware,
  requireGuestMiddleware,
} = require(`${__hooks}/auth/middleware.js`);

routerUse(refreshAuthMiddleware());
routerUse(requireAuthMiddleware());
routerUse(requireGuestMiddleware());

routerAdd("GET", "/auth/sign-up", (event) => {
  const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
  const html = renderPage(event, [`${__hooks}/auth/views/sign-up.html`]);
  return event.html(200, html);
});

routerAdd("POST", "/auth/sign-up", (event) => {
  try {
    const {
      USERS_AUTH_COLLECTION_NAME,
      refreshAuthState,
    } = require(`${__hooks}/auth/libs/authRecord.js`);
    const { getAuthRedirectURI } = require(`${__hooks}/auth/libs/routing.js`);
    const authRecord = new Record(
      $app.findCollectionByNameOrId(USERS_AUTH_COLLECTION_NAME),
      event.requestInfo().body
    );
    $app.save(authRecord);
    refreshAuthState(event, authRecord);
    return event.redirect(302, getAuthRedirectURI(event));
  } catch (err) {
    $app.logger().debug("Unable to sign-up user", err);
    return event.noContent(204);
  }
});

routerAdd("GET", "/auth/sign-in", (event) => {
  const { renderPage } = require(`${__hooks}/auth/libs/renderPage.js`);
  const html = renderPage(event, [`${__hooks}/auth/views/sign-in.html`]);
  return event.html(200, html);
});

routerAdd("POST", "/auth/sign-in", (event) => {
  try {
    const {
      USERS_AUTH_COLLECTION_NAME,
      refreshAuthState,
    } = require(`${__hooks}/auth/libs/authRecord.js`);
    const { getAuthRedirectURI } = require(`${__hooks}/auth/libs/routing.js`);
    const { identity, password } = event.requestInfo().body;
    const authRecord = $app.findAuthRecordByEmail(
      USERS_AUTH_COLLECTION_NAME,
      identity
    );
    if (authRecord.validatePassword(password)) {
      refreshAuthState(event, authRecord);
      return event.redirect(302, getAuthRedirectURI(event));
    } else {
      setAuthCookie(event, null, null);
      event.auth = null;
      return event.noContent(204);
    }
  } catch (err) {
    $app.logger().debug("Unable to sign-in user", err);
    return event.noContent(204);
  }
});

routerAdd("GET", "/auth/sign-out", (event) => {
  const { setAuthCookie } = require(`${__hooks}/auth/libs/authRecord.js`);
  const { getAuthRedirectURI } = require(`${__hooks}/auth/libs/routing.js`);
  setAuthCookie(event, null, null);
  event.auth = null;
  return event.redirect(302, getAuthRedirectURI(event));
});
