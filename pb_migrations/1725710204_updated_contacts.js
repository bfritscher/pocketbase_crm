/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.listRule = "@request.auth.id != \"\" "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.listRule = "@request.auth.id != \"\" &&\n@collection.groups.members ?= @request.auth.id &&\n@collection.groups.name = \"heg\""

  return dao.saveCollection(collection)
})
