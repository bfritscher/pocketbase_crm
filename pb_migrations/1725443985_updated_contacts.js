/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_H2cxKvj` ON `contacts` (`email`) WHERE `email` != ''",
    "CREATE UNIQUE INDEX `idx_2CbAHSe` ON `contacts` (`matricule`) WHERE `matricule` != ''"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0dgshj172gx026d")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_H2cxKvj` ON `contacts` (`email`)",
    "CREATE UNIQUE INDEX `idx_2CbAHSe` ON `contacts` (`matricule`) WHERE `matricule` != ''"
  ]

  return dao.saveCollection(collection)
})
