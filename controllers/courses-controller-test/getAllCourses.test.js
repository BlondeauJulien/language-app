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

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).toHaveLength(0);

    done();
  });

  it('should return courses', async done => {
    await seedCourses();
 
    const courses = await request.get(`/api/courses`);

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).not.toHaveLength(0);

    expect(courses.body.courses[0].creator._id).toBeTruthy();
    expect(courses.body.courses[0].creator.username).toBeTruthy();
    expect(courses.body.courses[0].language).toBeTruthy();
    expect(courses.body.courses[0].countryFlag).toBeTruthy();
    expect(courses.body.courses[0].learningFrom).toBeTruthy();

    done();
  });
});
