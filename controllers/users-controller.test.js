const app = require('../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../test-setup');
const User = require('../models/user');

setupDB('languageDBTest');

function createUserObj(username, email, password) {
  return {username, email, password};
}

function createSignInUserObj(email, password) {
  return {email, password};
}

describe('POST - /api/users/signup ', () => {
  it('Should save user to database - password hashed - get back token', async done => {
    const res = await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien@gmail.com', '123456'));

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

  it('Should not save a user missing username or with username.length < 4', async done => {
    const res = await request.post('/api/users/signup')
    .send(createUserObj('Jul', 'julien@gmail.com', '123456'));
    
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user).toBeFalsy();
    
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Username should contain 4 to 16 characters');

    done();
  });

  it('Should not save a user with invalid email', async done => {
    const res = await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'juliengmail.com', '123456'));
    
    const user = await User.findOne({ username: 'Julien' });
    expect(user).toBeFalsy();
    
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Please use a valid email');

    done();
  });

  it('Should not save a user with password shorter than 6 characters', async done => {
    const res = await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien@gmail.com', '12345'));
    
    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user).toBeFalsy();
    
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Password must contain at least 6 characters');

    done();
  });

  it('Should not save duplicate username and send back clear response message', async done => {
    await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien@gmail.com', '123456'));

    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user).toBeTruthy();

    const res = await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien123@gmail.com', '123456'));
    
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch('This username is already used');

    done();
  });

  it('Should not save duplicate email and send back clear response message', async done => {
    await request.post('/api/users/signup')
    .send(createUserObj('Julien', 'julien@gmail.com', '123456'));

    const user = await User.findOne({ email: 'julien@gmail.com' });
    expect(user).toBeTruthy();

    const res = await request.post('/api/users/signup')
    .send(createUserObj('Julien123', 'julien@gmail.com', '123456'));
    
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/This email is already used/i);

    done();
  });
});

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
