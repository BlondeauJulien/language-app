const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedVocabulary } = require('../../test/utils/seed');
const Course = require('../../models/course');

setupDB('languageDBTestUserControllerGetAllCourses');

describe('GET - /api/courses/:id/vocabulary', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedVocabulary();
    done();
  });

  it('should return an error if course is not found', async done => {
    const courseId = new ObjectID('55153a8014829a865bbf700d');

    const vocabularyRes = await request.get(`/api/vocabulary/${courseId}`);

    expect(vocabularyRes.status).toBe(404);
    expect(vocabularyRes.body.message).toMatch(/We did not find a course matching your request/i);

    done();
  });

  it('should return an empty array there is no vocabulary', async done => {
    const courseWithoutVocab = await Course.findOne({name: "user2Course1"});

    const vocabularyRes = await request.get(`/api/vocabulary/${courseWithoutVocab._id}`);

    expect(vocabularyRes.status).toBe(200);
    expect(Array.isArray(vocabularyRes.body.vocabulary)).toBe(true);
    expect(vocabularyRes.body.vocabulary).toHaveLength(0);

    done();
  });

  it('should return an array of vocabulary', async done => {
    const course = await Course.findOne({name: "user1Course1"});

    const vocabularyRes = await request.get(`/api/vocabulary/${course._id}`);

    expect(vocabularyRes.status).toBe(200);
    expect(Array.isArray(vocabularyRes.body.vocabulary)).toBe(true);
    expect(vocabularyRes.body.vocabulary).not.toHaveLength(0);

    expect(vocabularyRes.body.vocabulary[0].course._id).toBeTruthy();

    expect(vocabularyRes.body.vocabulary[0]).toEqual(expect.objectContaining({
      word: expect.any(String),
      translation: expect.any(Array),
      phrases: expect.any(Array),
      conjugationLink: expect.any(String),
      personalNote: expect.any(String),
      difficultyLevel: expect.any(Number),
      tags: expect.any(Array),
    }));


    done();
  });
});