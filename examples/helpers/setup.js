require('app-module-path').addPath(__dirname + '/../../')
require('colors')

const orango = require('lib')
const EVENTS = require('lib/consts/events')
const invoke = require('./invoke')
const DATABASE = 'examples'

orango.logger.level = 'info'

async function initCollections(db) {
  const User = db.model('User')

  await User.import([
    {
      _key: 'eddie',
      firstName: 'Eddie',
      lastName: 'VanHalen',
      tags: ['guitar'],
      born: 'January 26, 1955'
    },
    {
      firstName: 'Steve',
      lastName: 'Vai',
      tags: ['guitar', 'vocals']
    },
    {
      firstName: 'Randy',
      lastName: 'Rhoads',
      tags: ['guitar']
    },
    {
      firstName: 'Alex',
      lastName: 'Lifeson',
      tags: ['guitar', 'vocals']
    },
    {
      firstName: 'Slash',
      tags: ['guitar']
    }
  ])
  console.log(`✅  Populated "${User.collectionName}" collection`.green)
}

async function initDatabase() {
  await orango.connect()
  await orango.dropDatabase(DATABASE)
  await orango.createDatabase(DATABASE)
  await orango.disconnect()
}

module.exports = async function() {
  await initDatabase()

  // get sample db
  let db = orango.get(DATABASE)

  // listen for connection to ArangoDB
  db.events.on(EVENTS.CONNECTED, conn => {
    console.log('✅  Connected to:'.green, conn.url + '/' + conn.name)
  })

  // initialze models and inject db
  invoke(__dirname + '/../models', db)

  // connect to db
  await db.connect()

  // create collections
  await initCollections(db)

  // return db
  return db
}
