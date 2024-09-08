/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iif2d04801hucgm")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_XOmkcBE` ON `groups` (`name`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7sgtu1fd",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iif2d04801hucgm")

  collection.indexes = []

  // remove
  collection.schema.removeField("7sgtu1fd")

  return dao.saveCollection(collection)
})
