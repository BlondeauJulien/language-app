const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../../test/utils/test-setup');
const User = require('../../models/user');
const { seedUsers } = require('../../test/utils/seed');

setupDB('languageDBTestUserControllerPatchUserId');

function createSignInUserObj(email, password) {
  return {email, password};
}

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