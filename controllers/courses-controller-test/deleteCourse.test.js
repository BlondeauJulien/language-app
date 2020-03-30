const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID;  

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');

const Course = require('../../models/course');

setupDB('languageDBTestUserControllerDeleteCourse');

describe('DELETE - /api/courses/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  it('return an error if token is not valid', async done => {
    const deletedCourseRes = await request.delete(`/api/courses/randomID`)
    .set('Authorization', 'Bearer invalidtoken');

    expect(deletedCourseRes.status).toBe(401);
    expect(deletedCourseRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('return an error if requestor id does not match the course creator id', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const courseToDelete = await Course.findOne({name: 'user1Course1'});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(courseToDelete.name).toBe('user1Course1');

    const deletedCourseRes = await request.delete(`/api/courses/${courseToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedCourseRes.status).toBe(401);
    expect(deletedCourseRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('return an error if course to delete not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToDelete = new ObjectID('55153a8014829a865bbf700d');

    expect(user.body.username).toBe('user1');

    const deletedCourseRes = await request.delete(`/api/courses/${courseToDelete}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedCourseRes.status).toBe(404);
    expect(deletedCourseRes.body.message).toMatch(/The course you tried to delete does not exist/i);

    done();
  });

  it('return success message for authorized and completed delete', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToDelete = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToDelete.name).toBe('user1Course1');

    const deletedCourseRes = await request.delete(`/api/courses/${courseToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedCourseRes.status).toBe(200);
    expect(deletedCourseRes.body.message).toMatch(/Course deleted successfully/i);

    done();
  });
});