/// <reference path="../../../pb_data/types.d.ts" />

const AUTH_COOKIE_NAME = "pb_auth";
const AUTH_TOKEN_TYPE = "auth";
const USERS_AUTH_COLLECTION_NAME = "users";

function isLocalhostEnv() {
  return $os.getenv("PB_IS_LOCALHOST") === "true";
}

function getCookieDomain() {
  const url = $app.settings().meta.appURL;
  const domain = url.replace(/(^\w+:|^)\/\//, "");
  return domain;
}

function setAuthCookie(event, authToken, duration) {
  const localhostOptions = isLocalhostEnv()
    ? { domain: undefined, secure: false }
    : {};
  const authCookie = new Cookie({
    name: AUTH_COOKIE_NAME,
    value: authToken ?? "",
    maxAge: duration ?? -1,
    expires: duration ? undefined : "Thu, 01 Jan 1970 00:00:00 GMT",
    domain: getCookieDomain(),
    path: "/",
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    ...localhostOptions,
  });
  event.setCookie(authCookie);
}

function refreshAuthState(event, authRecord) {
  try {
    const { duration } = authRecord.collection().authToken;
    const authToken = authRecord.newAuthToken();
    setAuthCookie(event, authToken, duration);
    event.auth = authRecord;
  } catch (err) {
    $app.logger().error("Failed to refresh auth state", err);
  }
}

function getAuthRecordFromCookie(event) {
  try {
    const authCookie = event.request.cookie(AUTH_COOKIE_NAME);
    const authToken = authCookie?.value;
    if (authToken) {
      const authRecord = $app.findAuthRecordByToken(authToken, AUTH_TOKEN_TYPE);
      return authRecord;
    }
  } catch (err) {
    $app.logger().debug("Failed to retrieve auth record from cookie", err);
  }
  return null;
}

module.exports = {
  USERS_AUTH_COLLECTION_NAME,
  setAuthCookie,
  refreshAuthState,
  getAuthRecordFromCookie,
};
