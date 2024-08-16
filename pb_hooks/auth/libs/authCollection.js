/// <reference path="../../../pb_data/types.d.ts" />

const USERS_AUTH_COLLECTION_NAME = "users";

function getAuthCollection() {
  const authCollection = $app
    .dao()
    .findCollectionByNameOrId(USERS_AUTH_COLLECTION_NAME);
  if (!authCollection) {
    throw new Error(`Auth collection not found: ${USERS_AUTH_COLLECTION_NAME}`);
  }
  return authCollection;
}

module.exports = {
  getAuthCollection,
};
