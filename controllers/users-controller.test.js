const app = require('../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../test/utils/test-setup');
const User = require('../models/user');
const { seedUsers } = require('../test/utils/seed');

setupDB('languageDBTestUserController');

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


describe('PATCH - /api/users/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  it('should let a user update his infos', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      email: 'updated@gmail.com',
      username: 'updatedusername',
      currentPassword: '123456',
      password: 'azerty'
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(200);
    expect(updatedUserResponse.body.username).toBe('updatedusername');

    const updatedUser = await request.post('/api/users/login')
    .send(createSignInUserObj('updated@gmail.com', 'azerty'));

    expect(updatedUser.body.username).toBe('updatedusername');
    
    done();
  }); 

  it('should return an error if user pass wrong password', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      email: 'updated@gmail.com',
      username: 'updatedusername',
      currentPassword: 'fqfqfqffqs',
      password: 'azerty'
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/The password you entered/i);
    
    done();
  });

  it('should return an error if token is valid but doesn\'t match the user to update', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    const wrongUser = await request.post('/api/users/login')
    .send(createSignInUserObj('testing2@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');
    expect(wrongUser.body.username).toBe('changed');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      email: 'updated@gmail.com',
      username: 'updatedusername',
      currentPassword: '123456',
      password: 'azerty'
    }).set('Authorization', `Bearer ${wrongUser.body.token}`);

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/You are not authorized/i);
    
    done();
  });

  it('should return an error if token is not valid ', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      email: 'updated@gmail.com',
      username: 'updatedusername',
      currentPassword: '123456',
      password: 'azerty'
    }).set('Authorization', 'Bearer invalidtoken');

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/Authentication failed/i);
    
    done();
  });

  it('should not be able to be able to change role or status', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      currentPassword: '123456',
      role: 'admin'
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/You are not authorized/i);

    const updatedUserResponse2 = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      currentPassword: '123456',
      status: 'banned'
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse2.status).toBe(401);
    expect(updatedUserResponse2.body.message).toMatch(/You are not authorized/i);
    
    done();
  });

  it('should not be able to be able to have a username length < 4 or > 16', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      username: 'abc',
      currentPassword: '123456',
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(422);
    expect(updatedUserResponse.body.message).toMatch(/Username should/i);

    const updatedUserResponse2 = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      username: '12345678901234567',
      currentPassword: '123456',
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse2.status).toBe(422);
    expect(updatedUserResponse2.body.message).toMatch(/Username should/i);
    
    done();
  });

  it('should not be hashed', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      password: 'azerty',
      currentPassword: '123456',
    }).set('Authorization', `Bearer ${user.body.token}`);

    let updatedUser = await User.findOne({email: 'testing1@gmail.com'});

    expect(updatedUser.password).not.toBe('azerty');
    
    done();
  });

  it('should not be able to change email if input isn\'t a email', async done => {
    const user = await request.post('/api/users/login')
    .send(createSignInUserObj('testing1@gmail.com', '123456'));

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}`)
    .send({
      email: 'juliengmail.com',
      currentPassword: '123456',
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(422);
    expect(updatedUserResponse.body.message).toMatch(/Please use a valid email/i);
    
    done();
  }); 

});