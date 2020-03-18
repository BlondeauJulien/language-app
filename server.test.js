const app = require('./server');

const { setupDB } = require('./test/utils/test-setup');
const User = require('./models/user');
const { seedUsers, seedCourses } = require('./test/utils/seed');

setupDB('languageDBTest');

const supertest = require('supertest');
const request = supertest(app);

describe('App - GET / ', () => {
  it('home route should works & return Welcome message', async done => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to the server!');

    done();
  });

  it('should have at least 1 admin in DB', async done => {
    const admin = await User.findOne({role: 'admin'});
    expect(admin).toBeTruthy();

    done();
  });
});