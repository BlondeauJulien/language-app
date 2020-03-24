const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
require('dotenv').config();

const { setupDB } = require('../../test/utils/test-setup');
const User = require('../../models/user');
const { seedUsers } = require('../../test/utils/seed');

setupDB('languageDBTestUserControllerGetAllUsers');

describe('GET - /api/users', () => { 
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  it('should return an error if token is not valid', async done => {
    const response = await request.get('/api/users').set('Authorization', `Bearer InvalidToken543564564`);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return an error if requestor is not admin or moderator', async done => {
    const randomUser = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: 123456});

    expect(response.body.username).toBe('user1');

    const response = await request.get('/api/users').set('Authorization', `Bearer ${randomUser.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should get list of all users & moderators with relevant infos for admin', async done => {
    const admin = await request.post('/api/users/login')
    .send({email: process.env.DEFAULT_ADMIN_EMAIL, password: process.env.DEFAULT_ADMIN_PASSWORD});

    expect(admin.body.email).toBe(process.env.DEFAULT_ADMIN_EMAIL);

    const response = await request.get('/api/users').set('Authorization', `Bearer ${admin.body.token}`);

    const usersRole = response.body.users.reduce((roleArr, user) => roleArr.push(user.role) ,[]);

    expect(response.body.users).toHaveLength(4);
    expect(usersRole).arrayContaining(['user', 'moderator']);
    expect(response.body.users[0].username).toBeTruthy();
    expect(response.body.users[0].email).toBeTruthy();
    expect(response.body.users[0].role).toBeTruthy();
    expect(response.body.users[0].status).toBeTruthy();
    expect(response.body.users[0].password).toBeFalsy();

    done();
  });

  it('should get list of all users with relevant infos for moderator', async done => {
    const moderator = await request.post('/api/users/login')
    .send({email: 'testing4@gmail.com', password: '123456'});

    expect(admin.body.username).toBe(moderator1);

    const response = await request.get('/api/users').set('Authorization', `Bearer ${moderator.body.token}`);

    const usersRole = response.body.users.reduce((roleArr, user) => roleArr.push(user.role) ,[]);

    expect(response.body.users).toHaveLength(3);
    expect(usersRole).arrayContaining(['user']);
    expect(usersRole).not.arrayContaining(['moderator', 'admin']);
    expect(response.body.users[0].username).toBeTruthy();
    expect(response.body.users[0].email).toBeTruthy();
    expect(response.body.users[0].role).toBeTruthy();
    expect(response.body.users[0].status).toBeTruthy();
    expect(response.body.users[0].password).toBeFalsy();

    done();
  });
});