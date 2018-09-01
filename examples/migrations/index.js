const orango = require('../../lib')
const objectToArray = require('../../lib/helpers/objectToArray')
const Builder = require('../../tang/Builder')

async function importUsers() {
  const Model = orango.model('User')

  let items = require('./data/users')
  items = objectToArray(items)

  let docs = await Builder.getInstance()
    .data(items)
    .convertTo(Model)
    .toObject({ noDefaults: true })
    .build()

  await Model.importMany(docs, true)
}

async function importFriends() {
  const Model = orango.model('Friend')

  let items = require('./data/friends')
  items = objectToArray(items)

  let docs = await Builder.getInstance()
    .data(items)
    .convertTo(Model)
    .toObject({ noDefaults: true })
    .build()

  await Model.importMany(docs, true)
}

async function importPosts() {
  const Model = orango.model('Post')

  let items = require('./data/posts')
  items = objectToArray(items)

  let docs = await Builder.getInstance()
    .data(items)
    .convertTo(Model)
    .toObject({ noDefaults: true })
    .build()

  await Model.importMany(docs, true)
}

async function importLikes() {
  const Model = orango.model('Like')

  let items = require('./data/likes')
  items = objectToArray(items)

  let docs = await Builder.getInstance()
    .data(items)
    .convertTo(Model)
    .toObject({ noDefaults: true })
    .build()

  await Model.importMany(docs, true)
}

async function importAllDocs() {
  await importUsers()
  await importFriends()
  await importPosts()
  await importLikes()
}

module.exports = {
  importAllDocs,
  importUsers,
  importFriends,
  importPosts,
  importLikes
}
