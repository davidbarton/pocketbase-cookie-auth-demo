/// <reference path="../../../pb_data/types.d.ts" />

function getDebugValues(authRecord) {
  const urls = [
    { label: "Home", url: "/" },
    { label: "Sign Up", url: "/auth/sign-up" },
    { label: "Sign In", url: "/auth/sign-in" },
    { label: "Sign Out", url: "/auth/sign-out" },
  ];
  const user = [
    "id",
    "email",
    "emailVisibility",
    "verified",
    "name",
    "avatar",
    "created",
    "updated",
  ].map((key) => ({ key, val: authRecord?.get(key) ?? "" }));
  return { urls, user };
}

function renderPage(event, templatePaths, templateValues) {
  const filePaths = [
    `${__hooks}/auth/views/base.html`,
    `${__hooks}/auth/views/debug.html`,
    ...templatePaths,
  ];
  const values = {
    ...getDebugValues(event.auth),
    ...templateValues,
    pageURI: event.request.requestURI,
  };
  return $template.loadFiles(...filePaths).render(values);
}

module.exports = {
  renderPage,
};
