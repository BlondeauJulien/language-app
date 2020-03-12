const app = require('./server');

const supertest = require('supertest');
const request = supertest(app);

describe('App - GET / ', () => {
  it('home route should works & return Welcome message', async done => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to the server!');

    done();
  });
});