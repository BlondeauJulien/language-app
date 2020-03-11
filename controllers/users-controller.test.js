const app = require('../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../test-setup');
const User = require('../models/user');

setupDB('languageDBTest');

/* beforeAll(async () => {
  const url = `mongodb://localhost:27017/${databaseName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
});

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

afterEach(async () => {
  await removeAllCollections()
}); */

describe('POST - /api/users/signup ', () => {
  it('Should save user to database - password hashed - get back token', async done => {
    const res = await request.post('/api/users/signup')
    .send({
      username: 'Julien',
      email: 'julien@gmail.com',
      password: '123456'
    });

    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user.username).toBe('Julien');
    expect(user.email).toBe('julien@gmail.com');
    expect(user.password).toBeTruthy();
    expect(user.password).not.toBe('123456');

    expect(res.body.username).toBe('Julien');
    expect(res.body.email).toBe('julien@gmail.com');
    expect(res.body.password).toBeFalsy();
    expect(res.body.token).toBeTruthy();

    done();
  });
});
