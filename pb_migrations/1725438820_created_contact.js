/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0dgshj172gx026d",
    "created": "2024-09-04 08:33:40.045Z",
    "updated": "2024-09-04 08:33:40.045Z",
    "name": "contact",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0tk7cdyu",
        "name": "firstname",
        "type": "text",
        "required": false,
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
        "id": "bbuf90u1",
        "name": "lastname",
        "type": "text",
        "required": false,
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
        "id": "qcocvods",
        "name": "matricule",
        "type": "text",
        "required": false,
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
        "id": "yews5fhv",
        "name": "email",
        "type": "email",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "37wi3qu2",
        "name": "title",
        "type": "text",
        "required": false,
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
        "id": "pvxibby3",
        "name": "info",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_H2cxKvj` ON `contact` (`email`)",
      "CREATE UNIQUE INDEX `idx_2CbAHSe` ON `contact` (`matricule`)"
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
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d");

  return dao.deleteCollection(collection);
})
