const app = require('./server');

const { setupDB } = require('./test/utils/test-setup');
const User = require('./models/user');

setupDB('languageDBTestServer');

const supertest = require('supertest');
const request = supertest(app);

describe('App - GET / ', () => {
  it('should have at least 1 admin in DB', async done => {
    const admin = await User.findOne({role: 'admin'});
    expect(admin).toBeTruthy();

    done();
  });
});