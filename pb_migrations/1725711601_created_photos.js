/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vg8hksp77k8g3p2",
    "created": "2024-09-07 12:20:01.913Z",
    "updated": "2024-09-07 12:20:01.913Z",
    "name": "photos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kowdsuto",
        "name": "matricule",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vbjpzlfc",
        "name": "field",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_a7oJUsU` ON `photos` (`matricule`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vg8hksp77k8g3p2");

  return dao.deleteCollection(collection);
})
