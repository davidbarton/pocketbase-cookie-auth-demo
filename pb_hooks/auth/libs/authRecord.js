/// <reference path="../../../pb_data/types.d.ts" />

const { getAuthTokenSecret } = require(`${__hooks}/auth/libs/authSettings.js`);
const { getAuthCollection } = require(`${__hooks}/auth/libs/authCollection.js`);

function upsertAuthRecord(ctx) {
  const authCollection = getAuthCollection();
  const authRecord = new Record(authCollection);
  const form = new RecordUpsertForm($app, authRecord);
  form.loadData($apis.requestInfo(ctx).data);
  form.submit();
  return authRecord;
}

function getAuthRecordByPassword(ctx) {
  const authCollection = getAuthCollection();
  const form = new RecordPasswordLoginForm($app, authCollection);
  ctx.bind(form);
  const authRecord = form.submit();
  return authRecord;
}

function getAuthRecordByToken(authToken) {
  const secret = getAuthTokenSecret();
  const authRecord = $app.dao().findAuthRecordByToken(authToken, secret);
  return authRecord;
}

function generateAuthToken(authRecord) {
  const authToken = $tokens.recordAuthToken($app, authRecord);
  return authToken;
}

module.exports = {
  upsertAuthRecord,
  getAuthRecordByPassword,
  getAuthRecordByToken,
  generateAuthToken,
};
