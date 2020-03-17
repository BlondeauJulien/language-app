const {createDefaultAdmin} = require('./createDefaultAdminUser');

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.promise = global.Promise;

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message)
    }
  }
}

module.exports = {
  setupDB (databaseName) {
    // Connect to Mongoose
    beforeAll(async done => {
      const url = `mongodb://localhost:27017/${databaseName}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      done();
    });

    beforeEach(async done => {
      await createDefaultAdmin();
      done();
    });

    // Cleans up database between each test
    afterEach(async done => {
      await removeAllCollections()
      done()
    });

    // Disconnect Mongoose
    afterAll(async done => {
      await dropAllCollections();
      await mongoose.connection.close();
      done();
    });
  }
}