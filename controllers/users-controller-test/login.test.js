const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../../test/utils/test-setup');
const User = require('../../models/user');

setupDB('languageDBTestUserControllerPostUserLogin');

function createUserObj(username, email, password) {
  return {username, email, password};
}

function createSignInUserObj(email, password) {
  return {email, password};
}

describe('GET - /api/users/login ', () => {
  beforeEach(async done => {
    await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien@gmail.com', '123456'));
    done();
  });

  it('Should get existing user from DB and return username, email and token', async done => {
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user.username).toBe('Julien');

    const res = await request.post('/api/users/login')
    .send(createSignInUserObj('julien@gmail.com', '123456'));

    expect(res.body.username).toBe('Julien');
    expect(res.body.email).toBe('julien@gmail.com');
    expect(res.body.password).toBeFalsy();
    expect(res.body.token).toBeTruthy();

    done();
  });

  it('should not be able to login with unknown email address', async done => {
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user.email).toBe('julien@gmail.com');

    const res = await request.post('/api/users/login')
    .send(createSignInUserObj('julien123@gmail.com', '123456'));

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/We didn't find an user for/i);

    done();
  });

  it('should not be able to login with wrong password', async done => {
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user.email).toBe('julien@gmail.com');

    const res = await request.post('/api/users/login')
    .send(createSignInUserObj('julien@gmail.com', 'abcdef'));

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Wrong password/i);

    done();
  });

  it('should not be able to login if banned', async done => {
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user.email).toBe('julien@gmail.com');

    await User.updateOne({ email: 'julien@gmail.com' }, {status: 'banned'});

    const res = await request.post('/api/users/login')
    .send(createSignInUserObj('julien@gmail.com', '123456'));

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/You are banned/i);

    done();
  });
});