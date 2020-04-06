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

  it('should return all courses', async done => {
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

  it('should return courses filtered by name', async done => {
    await seedCourses();
 
    const courses = await request.get(`/api/courses?name=user1`);

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).toHaveLength(3);

    expect(courses.body.courses[0].name).toMatch(/user1/i);

    done();
  });

  it('should return courses filtered by language', async done => {
    await seedCourses();
 
    const courses = await request.get(`/api/courses?language=norwegian`);

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).toHaveLength(1);

    expect(courses.body.courses[0].language).toMatch(/norwegian/i);

    done();
  });

  it('should return courses filtered by the learningFrom language', async done => {
    await seedCourses();
 
    const courses = await request.get(`/api/courses?learningFrom=dutch`);

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).toHaveLength(1);

    expect(courses.body.courses[0].learningFrom).toMatch(/dutch/i);

    done();
  });

  it('should return courses filtered by all filter', async done => {
    await seedCourses();
 
    const courses = await request.get(`/api/courses?name=user1&language=norwegian&learningFrom=dutch`);

    expect(Array.isArray(courses.body.courses)).toBe(true);
    expect(courses.body.courses).toHaveLength(1);

    expect(courses.body.courses[0].name).toMatch(/user1/i);
    expect(courses.body.courses[0].language).toMatch(/norwegian/i);
    expect(courses.body.courses[0].learningFrom).toMatch(/dutch/i);

    done();
  });

});
