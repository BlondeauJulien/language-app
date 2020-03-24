const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID;  

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');
const User = require('../../models/user');
const Course = require('../../models/course');


setupDB('languageDBTestUserControllerGetAllCoursesFromUser');

describe('GET - /api/users/:id/courses', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  it('should return an error if user is not found', async done => {
    const falseId = new ObjectID('55153a8014829a865bbf700d');

    const response = await request.get(`/api/users/${falseId}/courses`);

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/We did not find an user matching your request/i);

    done();
  });

  it('should return an error if requested user is banned', async done => {
    const user = await User.findOne({email: 'testing3@gmail.com'});

    expect(user.username).toBe('user3');
    expect(user.status).toBe('banned');

    const response = await request.get(`/api/users/${user._id}/courses`);

    expect(response.status).toBe(403);
    expect(response.body.message).toMatch(/The user you requested the course from is banned/i);

    done();
  });

  it('should return an array of courses', async done => {
    const user = await User.findOne({email: 'testing1@gmail.com'});

    expect(user.username).toBe('user1');

    const response = await request.get(`/api/users/${user._id}/courses`);

    console.log(response.body.user.courseCreated);

    expect(response.status).toBe(200);
    expect(response.body.user.courseCreated).toHaveLength(3);
    expect(response.body.user.courseCreated[0].name).toBeTruthy();
    expect(response.body.user.courseCreated[0].language).toBeTruthy();
    expect(response.body.user.courseCreated[0].learningFrom).toBeTruthy();
    expect(response.body.user.courseCreated[0].countryFlag).toBeTruthy();
    expect(response.body.user.courseCreated[0].vocabulary).toBeFalsy();
    expect(response.body.user.courseCreated[0].quizzes).toBeFalsy();

    done();
  });
});