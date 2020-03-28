const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers } = require('../../test/utils/seed');

const User = require('../../models/user');
const Course = require('../../models/course');

setupDB('languageDBTestUserControllerCreateCourse');

describe('POST - /api/courses', () => { 
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  let defaultCourse = {
    name: 'course name',
    language: 'test language',
    learningFrom: 'another language',
    countryFlag: 'FR'
  }

  it('return an error if token is not valid', async done => {

    const createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourse).set('Authorization', 'Bearer invalidtoken');

    expect(createCourseRes.status).toBe(401);
    expect(createCourseRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return an error if course name is invalid', async done => {

    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    let defaultCourseChanged = {...defaultCourse, name :'xxx'};

    let createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid course name/i);

    defaultCourseChanged.name = 'tvdhhvhhvdhvdthvhvsvsvsvshvshvhsvssvvsrvsvsvvhrtsvssrvrgvvrgvgrvgdrvgdr'

    createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid course name/i);

    done();
  });

  it('should return an error if language name is invalid', async done => {

    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    let defaultCourseChanged = {...defaultCourse, language :'x'};

    let createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid language name/i);

    defaultCourseChanged.name = 'tvdhhvhhvdhvdthvhvsvsvsvshvshvhsvssv'

    createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid language name/i);

    done();
  });

  it('should return an error if languagefrom name is invalid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    let defaultCourseChanged = {...defaultCourse, learningFrom :'x'};

    let createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid language \(learning from\) name/i);

    defaultCourseChanged.learningFrom = 'tvdhhvhhvdhvdthvhvsvsvsvshvshvhsvssv'

    createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid language \(learning from\) name/i);

    done();
  });

  it('should return an error if country flag is not 2 chars long', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    let defaultCourseChanged = {...defaultCourse, countryFlag :'x'};

    let createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid country flag input/i);

    defaultCourseChanged.countryFlag = 'tvd'

    createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourseChanged).set('Authorization', `Bearer ${user.body.token}`);

    expect(createCourseRes.status).toBe(422);
    expect(createCourseRes.body.message).toMatch(/Invalid country flag input/i);

    done();
  });

  it('should return the created course info if all fields are valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    let createCourseRes = await request.post(`/api/courses`)
    .send(defaultCourse).set('Authorization', `Bearer ${user.body.token}`);

    defaultCourse.creator = {id: user.body.userId, username: user.body.username};
    defaultCourse.courseId = createCourseRes.body.courseId;

    expect(createCourseRes.status).toBe(201);
    expect(createCourseRes.body).toMatchObject(defaultCourse);

    //course is saved in DB
    const findCourse = await Course.findOne({name: defaultCourse.name});
    expect(findCourse.name).toBe(defaultCourse.name);

    //Creator should have a new ref of the new course
    const creator = await User.findOne({username: 'user1'});
    expect(creator.courseCreated).toEqual(expect.arrayContaining([findCourse._id]));

    done();
  });
});