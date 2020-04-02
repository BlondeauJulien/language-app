const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedQuizzes } = require('../../test/utils/seed');
const Course = require('../../models/course');

setupDB('languageDBTestUserControllerGetQuizzes');

describe('GET - /api/courses/:id/quizzes', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedQuizzes();
    done();
  });

  it('should return an error if course is not found', async done => {
    const courseId = new ObjectID('55153a8014829a865bbf700d');

    const quizzesRes = await request.get(`/api/courses/${courseId}/quizzes`);

    expect(quizzesRes.status).toBe(404);
    expect(quizzesRes.body.message).toMatch(/We did not find a course matching your request/i);

    done();
  });

  it('should return an empty array if there is no quizzes', async done => {
    const courseWithoutQuizzes = await Course.findOne({name: "user2Course1"});

    const quizzesRes = await request.get(`/api/courses/${courseWithoutQuizzes._id}/quizzes`);

    expect(quizzesRes.status).toBe(200);
    expect(Array.isArray(quizzesRes.body.course.quizzes)).toBe(true);
    expect(quizzesRes.body.course.quizzes).toHaveLength(0);

    done();
  });

  it('should return an array of quizzes', async done => {
    const course = await Course.findOne({name: "user1Course1"});

    const quizzesRes = await request.get(`/api/courses/${course._id}/quizzes`);

    expect(quizzesRes.status).toBe(200);
    expect(Array.isArray(quizzesRes.body.course.quizzes)).toBe(true);
    expect(quizzesRes.body.course.quizzes).not.toHaveLength(0);

    expect(quizzesRes.body.course.quizzes[0].course).toBeTruthy();

    expect(quizzesRes.body.course.quizzes[0]).toEqual(expect.objectContaining({
      answers: expect.any(Array),
      image: expect.any(String),
      imageIsApprouved: expect.any(Boolean),
      difficultyLevel: expect.any(Number),
      tags: expect.any(Array),
    }));


    done();
  });
});