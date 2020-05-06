const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID;  

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');

const Course = require('../../models/course');

setupDB('languageDBTestUserControllerPatchCourse');

describe('Patch - /api/courses/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  it('return an error if token is not valid', async done => {
    const updatedCourseRes = await request.patch(`/api/courses/randomID`)
    .send({name: 'new name'}).set('Authorization', 'Bearer invalidtoken');

    expect(updatedCourseRes.status).toBe(401);
    expect(updatedCourseRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('return an error if token infos does not match the course creator infos', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(courseToUpdate.name).toBe('user1Course1');

    const updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({name: 'new name'}).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(401);
    expect(updatedCourseRes.body.message).toMatch(/You are not authorized/i);

    done();
  });
 
  it('should return an error if updated course name is invalid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({name: 'new'}).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid course name/i);

    updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({name: 'fsdcqgfdgcfgfdcqgyfdcgydfqgfdggfdcsgcfdghcfdghhgfdchgfdchgcfdhkgcdfhjkcfd'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid course name/i);

    done();
  });

  it('should return an error if updated language name is invalid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({language: 'n'}).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid language name/i);

    updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({language: 'fsdcqgfdgcfgfdcqgyfdcgydfqgfdggfdcsgcfdghcfdg'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid language name/i);

    done();
  });

  it('should return an error if updated languageFrom name is invalid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({learningFrom: 'n'}).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid language \(learning from\) name/i);

    updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({learningFrom: 'fsdcqgfdgcfgfdcqgyfdcgydfqgfdggfdcsgcfdghcfdg'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid language \(learning from\) name/i);

    done();
  });

  it('should return an error if updated countryflag is not 2 chars long', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({countryFlag: 'n'}).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid country flag input/i);

    updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send({countryFlag: 'aaa'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(422);
    expect(updatedCourseRes.body.message).toMatch(/Invalid country flag input/i);

    done();
  });

  it('return an error if course not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const courseToUpdate = new ObjectID('55153a8014829a865bbf700d');

    expect(user.body.email).toBe('testing2@gmail.com');

    const updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate}`)
    .send({name: 'new name'}).set('Authorization', `Bearer ${user.body.token}`);

    //expect(updatedCourseRes.status).toBe(404);
    expect(updatedCourseRes.body.message).toMatch(/The course you tried to update/i);

    done();
  });

  it('should be able to update all fields at once', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let fieldsToUpdate = {
      name: "new name",
      language: "new language",
      learningFrom: "another language",
      countryFlag: "NO"
    }

    const updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send(fieldsToUpdate).set('Authorization', `Bearer ${user.body.token}`);

    fieldsToUpdate.creator = {_id: user.body.userId, username: user.body.username};
    fieldsToUpdate._id = updatedCourseRes.body._id;

    expect(updatedCourseRes.status).toBe(200);

    expect(updatedCourseRes.body).toMatchObject(fieldsToUpdate);

    done();
  });

  it('return be able to update only one field', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const courseToUpdate = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(courseToUpdate.name).toBe('user1Course1');

    let fieldsToUpdate = {
      name: "new name",
    }

    const updatedCourseRes = await request.patch(`/api/courses/${courseToUpdate._id}`)
    .send(fieldsToUpdate).set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedCourseRes.status).toBe(200);
    expect(updatedCourseRes.body.name).toBe('new name');

    done();
  }); 
})