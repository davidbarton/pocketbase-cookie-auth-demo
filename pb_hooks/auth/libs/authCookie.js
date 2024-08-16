/// <reference path="../../../pb_data/types.d.ts" />

const {
  isLocalhostEnv,
  getCookieDomain,
  getCookieDuration,
} = require(`${__hooks}/auth/libs/authSettings.js`);
const {
  getAuthRecordByToken,
  generateAuthToken,
} = require(`${__hooks}/auth/libs/authRecord.js`);

const AUTH_COOKIE_NAME = "pb_auth";

function createAuthCookie(authToken, options) {
  const localhostOptions = isLocalhostEnv()
    ? { domain: undefined, secure: false }
    : {};

  return new Cookie({
    name: AUTH_COOKIE_NAME,
    value: authToken,
    maxAge: getCookieDuration(),
    domain: getCookieDomain(),
    path: "/",
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    ...localhostOptions,
    ...options,
  });
}

function getAuthCookie(ctx) {
  try {
    const authCookie = ctx.cookie(AUTH_COOKIE_NAME);
    const authToken = authCookie?.value;
    if (authToken) {
      const authRecord = getAuthRecordByToken(authToken);
      return authRecord;
    }
  } catch {}
  return null;
}

function setAuthCookie(ctx, authRecord) {
  if (authRecord) {
    const authToken = generateAuthToken(authRecord);
    const authCookie = createAuthCookie(authToken);
    ctx.setCookie(authCookie);
  } else {
    const authCookie = createAuthCookie("", {
      expires: "Thu, 01 Jan 1970 00:00:00 GMT",
      maxAge: 0,
    });
    ctx.setCookie(authCookie);
  }
}

module.exports = {
  getAuthCookie,
  setAuthCookie,
};
