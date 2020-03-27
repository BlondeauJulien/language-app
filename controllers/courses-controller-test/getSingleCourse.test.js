const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID;  

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');

const Course = require('../../models/course');

setupDB('languageDBTestUserControllerGetSingleCourse');

describe('GET - /api/courses/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  it('should return an error 404 if course doesn\'t exist', async done => {
    const fakeId = new ObjectID('55153a8014829a865bbf700d');

    const course = await request.get(`/api/courses/${fakeId}`);

    expect(course.status).toBe(404);
    expect(course.body.message).toMatch(/We did not find/i);

    done();
  });

  it('should return requested course', async done => {
    const user1Course1 = await Course.findOne({ name: 'user1Course1'}).populate('creator');

    expect(user1Course1.name).toBe('user1Course1');
    expect(user1Course1.creator.username).toBe('user1');

    const course = await request.get(`/api/courses/${user1Course1._id}`);

    expect(course.status).toBe(200);
    expect(course.body.course.name).toBe(user1Course1.name);
    expect(course.body.course.language).toBe(user1Course1.language);
    expect(course.body.course.countryFlag).toBe(user1Course1.countryFlag);
    expect(course.body.course.learningFrom).toBe(user1Course1.learningFrom);
    expect(course.body.course.creator._id).toBe(user1Course1.creator._id);
    expect(course.body.course.creator.username).toBe(user1Course1.creator.username);

    expect(course.body.course.vocabulary).toBeFalsy();
    expect(course.body.course.quizzes).toBeFalsy();

    done();
  });
});
