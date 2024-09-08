/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8hksp77k8g3p2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rncvghip",
    "name": "base64",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("vg8hksp77k8g3p2")

  // remove
  collection.schema.removeField("rncvghip")

  return dao.saveCollection(collection)
})
