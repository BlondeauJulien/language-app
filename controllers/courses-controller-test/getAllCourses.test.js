const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');

setupDB('languageDBTestUserControllerGetAllCourses');

describe('GET - /api/courses', () => { 
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  it('should return an empty array if there is no courses found', async done => {
    const courses = await request.get(`/api/courses`);

    expect(Array.isArray(courses)).toBe(true);
    expect(courses).toHaveLength(0);

    done();
  });

  it('should return courses', async done => {
    await seedCourses();

    const courses = await request.get(`/api/courses`);

    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).not.toHaveLength(0);

    expect(courses[0].creatorId).toBeTruthy();
    expect(courses[0].creatorName).toBeTruthy();
    expect(courses[0].language).toBeTruthy();
    expect(courses[0].countryFlag).toBeTruthy();
    expect(courses[0].learningFrom).toBeTruthy();

    done();
  });

});