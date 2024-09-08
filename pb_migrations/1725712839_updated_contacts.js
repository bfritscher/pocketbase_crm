/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.viewRule = "@request.auth.id != \"\" &&\n@collection.groups.members.id ?= @request.auth.id &&\n@collection.groups.name = \"heg\""
  collection.createRule = "@request.auth.id != \"\" &&\n@collection.groups.members.id ?= @request.auth.id &&\n@collection.groups.name = \"heg\""
  collection.updateRule = "@request.auth.id != \"\" &&\n@collection.groups.members.id ?= @request.auth.id &&\n@collection.groups.name = \"heg\""
  collection.deleteRule = "@request.auth.id != \"\" &&\n@collection.groups.members.id ?= @request.auth.id &&\n@collection.groups.name = \"heg\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id != \"\""
  collection.deleteRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
