/// <reference path="../../../pb_data/types.d.ts" />

function isLocalhostEnv() {
  return $os.getenv("PB_IS_LOCALHOST") === "true";
}

function getAuthWhitelistedRoutes() {
  return [
    "/_",
    "/api",
    "/auth/sign-up",
    "/auth/sign-in",
    "/auth/sign-out",
    "/auth/recovery",
  ];
}

function getCookieDomain() {
  const url = $app.settings().meta.appUrl;
  const domain = url.replace(/(^\w+:|^)\/\//, "");
  return domain;
}

function getCookieDuration() {
  return $app.settings().recordAuthToken.duration;
}

function getAuthTokenSecret() {
  return $app.settings().recordAuthToken.secret;
}

module.exports = {
  isLocalhostEnv,
  getAuthWhitelistedRoutes,
  getCookieDomain,
  getCookieDuration,
  getAuthTokenSecret,
};
