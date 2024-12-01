/// <reference path="../pb_data/types.d.ts" />

cronAdd("reset", "5 4 * * *", () => {
  const log = $app.logger().withGroup("Cron");
  const truncateCollections = ["users"];
  const collections = $app.findAllCollections();
  for (const collection of collections) {
    if (!collection || collection.system === true) {
      continue;
    }
    if (truncateCollections.includes(collection.name)) {
      log.info(`Truncating collection: ${collection.name}`);
      $app.db().truncateTable(collection.name).execute();
    } else {
      log.info(`Deleting ${collection.type} collection: ${collection.name}`);
      $app.delete(collection);
    }
  }
});
