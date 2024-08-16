/// <reference path="../../../pb_data/types.d.ts" />

const AUTH_CONTEXT_NAME = "authRecord";

function getAuthContext(ctx) {
  const authRecord = ctx.get(AUTH_CONTEXT_NAME);
  return authRecord;
}

function setAuthContext(ctx, authRecord) {
  ctx.set(AUTH_CONTEXT_NAME, authRecord);
}

module.exports = {
  getAuthContext,
  setAuthContext,
};
