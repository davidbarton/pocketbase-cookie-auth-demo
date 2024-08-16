/// <reference path="../../../pb_data/types.d.ts" />

const { getAuthState } = require(`${__hooks}/auth/libs/authState.js`);

function getDebugValues(ctx) {
  const authRecord = getAuthState(ctx);
  const urls = [
    { label: "Home", url: "/" },
    { label: "Sign Up", url: "/auth/sign-up" },
    { label: "Sign In", url: "/auth/sign-in" },
    { label: "Sign Out", url: "/auth/sign-out" },
  ];
  const user = [
    "id",
    "created",
    "updated",
    "username",
    "email",
    "emailVisibility",
    "verified",
    "name",
    "avatar",
  ].map((key) => ({ key, val: authRecord ? authRecord.get(key) : "" }));
  return { urls, user };
}

function renderPage(ctx, templatePath) {
  const filePaths = [
    `${__hooks}/auth/views/base.html`,
    `${__hooks}/auth/views/debug.html`,
    ...templatePath,
  ];
  const values = {
    ...getDebugValues(ctx),
    pageURI: ctx.request().requestURI,
  };
  return $template.loadFiles(...filePaths).render(values);
}

module.exports = {
  renderPage,
};
