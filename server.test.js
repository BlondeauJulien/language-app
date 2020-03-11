const app = require('./server');

const supertest = require('supertest');
const request = supertest(app); 

describe('App environment ', () => {
  it('should use "test" as NODE_ENV value', async () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});

describe('App - GET / ', () => {
  it('should use "test" as NODE_ENV value', async done => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to the server!');

    done();
  });
});