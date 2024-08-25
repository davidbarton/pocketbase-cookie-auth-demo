/// <reference path="../pb_data/types.d.ts" />

cronAdd("reset", "5 4 * * *", () => {
  const truncateCollections = ["users"];
  const collectionTypes = ["view", "base", "auth"];
  for (const collectionType of collectionTypes) {
    const collections = $app.dao().findCollectionsByType(collectionType);
    for (const collection of collections) {
      if (truncateCollections.includes(collection.name)) {
        $app.logger().info(`Truncating collection: ${collection.name}`);
        $app.dao().db().truncateTable(collection.name).execute();
      } else {
        $app
          .logger()
          .info(`Deleting ${collectionType} collection: ${collection.name}`);
        $app.dao().deleteCollection(collection);
      }
    }
  }
});
