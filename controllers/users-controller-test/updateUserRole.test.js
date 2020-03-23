const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
require('dotenv').config();
const ObjectID = require('mongodb').ObjectID;  

const { setupDB } = require('../../test/utils/test-setup');
const User = require('../../models/user');
const { seedUsers } = require('../../test/utils/seed');

setupDB('languageDBTestUserControllerPatchUserIdRole');

describe('PATCH - /api/users/:id/role', () => { 
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  it('should not be able to send invalid role string', async done => {
    const admin = await request.post('/api/users/login')
    .send({email: process.env.DEFAULT_ADMIN_EMAIL, password: process.env.DEFAULT_ADMIN_PASSWORD});

    const user = await User.findOne({email: 'testing1@gmail.com'});

    expect(admin.body.email).toBe(process.env.DEFAULT_ADMIN_EMAIL);
    expect(user.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user._id}/role`)
    .send({
      role: 'notValid',
      password: process.env.DEFAULT_ADMIN_PASSWORD
    }).set('Authorization', `Bearer ${admin.body.token}`);

    expect(updatedUserResponse.status).toBe(422);
    expect(updatedUserResponse.body.message).toMatch(/Invalid role passed/i);
    
    done();
  }); 

  it('should not pass if token doesn\'t match admin', async done => {
    const user = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user.body.userId}/role`)
    .send({
      role: 'moderator',
      password: process.env.DEFAULT_ADMIN_PASSWORD
    }).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/You are not authorized/i);
    
    done();
  }); 

  it('should not be able to continue if password doesn\'t match', async done => {
    const admin = await request.post('/api/users/login')
    .send({email: process.env.DEFAULT_ADMIN_EMAIL, password: process.env.DEFAULT_ADMIN_PASSWORD});

    const user = await User.findOne({email: 'testing1@gmail.com'});

    expect(admin.body.email).toBe(process.env.DEFAULT_ADMIN_EMAIL);
    expect(user.username).toBe('user1');

    const updatedUserResponse = await request.patch(`/api/users/${user._id}/role`)
    .send({
      role: 'moderator',
      password: '123456'
    }).set('Authorization', `Bearer ${admin.body.token}`);

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toMatch(/Wrong password passed/i);
    
    done();
  }); 

  it('should return an error if user to update doesn\'t exist', async done => {
    const admin = await request.post('/api/users/login')
    .send({email: process.env.DEFAULT_ADMIN_EMAIL, password: process.env.DEFAULT_ADMIN_PASSWORD});

    expect(admin.body.email).toBe(process.env.DEFAULT_ADMIN_EMAIL);

    const falseId = new ObjectID('55153a8014829a865bbf700d')

    const updatedUserResponse = await request.patch(`/api/users/${falseId}/role`)
    .send({
      role: 'moderator',
      password: process.env.DEFAULT_ADMIN_PASSWORD
    }).set('Authorization', `Bearer ${admin.body.token}`);

    expect(updatedUserResponse.status).toBe(404);
    expect(updatedUserResponse.body.message).toMatch(/The user you try to update/i);
    
    done();
  }); 

  it('should let an admin change an user role', async done => {
    const admin = await request.post('/api/users/login')
    .send({email: process.env.DEFAULT_ADMIN_EMAIL, password: process.env.DEFAULT_ADMIN_PASSWORD});

    const user = await User.findOne({email: 'testing1@gmail.com'});

    expect(admin.body.email).toBe(process.env.DEFAULT_ADMIN_EMAIL);
    expect(user.username).toBe('user1');
    expect(user.role).toBe('user');

    const updatedUserResponse = await request.patch(`/api/users/${user._id}/role`)
    .send({
      role: 'moderator',
      password: process.env.DEFAULT_ADMIN_PASSWORD
    }).set('Authorization', `Bearer ${admin.body.token}`);

    expect(updatedUserResponse.status).toBe(200);
    expect(updatedUserResponse.body.message).toMatch(/Successfully updated role for/i);
    expect(updatedUserResponse.body.message).toMatch(/user1/i);
    expect(updatedUserResponse.body.message).toMatch(/moderator/i);

    const updatedUser = await User.findOne({email: 'testing1@gmail.com'});

    expect(updatedUser.role).toBe('moderator');


    done();
  }); 
});