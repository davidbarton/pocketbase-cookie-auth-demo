/// <reference path="../../../pb_data/types.d.ts" />

const GUEST_ROUTES = ["/auth/sign-up", "/auth/sign-in", "/auth/recovery"];

const WHITELISTED_ROUTES = [...GUEST_ROUTES, "/_", "/api", "/auth/sign-out"];

function isRouteMatch(path, whitelisted) {
  return whitelisted.some((item) => path.startsWith(item));
}

function getAuthRedirectURI(event) {
  const query = event.requestInfo().query ?? {};
  return query.redirect ?? "/";
}

function getGuestRedirectURI(event) {
  const callbackURI = encodeURIComponent(event.request.requestURI);
  return `/auth/sign-in?redirect=${callbackURI}`;
}

module.exports = {
  GUEST_ROUTES,
  WHITELISTED_ROUTES,
  isRouteMatch,
  getAuthRedirectURI,
  getGuestRedirectURI,
};
