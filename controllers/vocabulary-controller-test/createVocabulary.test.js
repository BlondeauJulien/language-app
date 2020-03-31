const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');

setupDB('languageDBTestUserControllerCreateVocabulary');

describe('POST - /api/vocabulary', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  let defaultVocab = {
    word: 'word',
    translation: ["translation1", "translation2"],
    phrases: [{origin: "phrase1", translation: "phrasetranslation1"},
    {origin: "phrase2", translation: "phrasetranslation2"}],
    conjugationLink: 'www.google.com',
    personalNote: 'This is a personal note',
    difficultyLevel: 10,
    tags: ['tag1', 'tag2', 'tag3']
  }

  it('should return an error if token is not valid', async done => {

    const createVocabRes = await request.post(`/api/vocabulary`)
    .send(defaultVocab).set('Authorization', 'Bearer invalidtoken');

    expect(createVocabRes.status).toBe(401);
    expect(createVocabRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return error if word input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      word: '     '
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Word is not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      word: new Array(31).fill('a').join('')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Word is not valid/i);

    done();
  });

  it('should return error if translation input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      translation: []
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      translation: new Array(9).fill('abcd')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    
    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      translation: new Array(5).fill('     ')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      translation: new Array(5).fill(new Array(31).fill('a').join(''))
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    done();
  });

  it('should return error if phrases input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      phrases: new Array(9).fill({origin: "abcd", translation: "abcd"})
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    
    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      phrases: new Array(1).fill({origin: new Array(201).fill('a').join(''), translation: "abcd"})
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      phrases: new Array(1).fill({origin: "abcd", translation: new Array(201).fill('a').join('')})
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      phrases: new Array(1).fill({origin: "", translation: "abcd"})
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      phrases: new Array(1).fill({origin: "abcd", translation: ""})
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Translations are not valid/i);

    done();
  });

  it('should return error if conjugationlink is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      conjugationLink: new Array(101).fill('a').join('')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Link to conjugation is not valid/i);

    done();
  });

  it('should return error if conjugationlink is empty', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      personalNote: new Array(401).fill('a').join('')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/Your note is not valid/i);

    done();
  });

  it('should return error if difficulty is not numeric', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      difficultyLevel: 'a'
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/The difficulaty number is not valid/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      tags: new Array(11).fill('abcd')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/The difficulaty number is not valid/i);

    createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id,
      tags: new Array(2).fill('ab')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(422);
    expect(createVocabRes.body.message).toMatch(/The tags are not valid/i);

    done();
  });

  it('should return error if course not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = new ObjectID('55153a8014829a865bbf700d')

    expect(user.body.username).toBe('user1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(404);
    expect(createVocabRes.body.message).toMatch(/We did not find the course/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(401);
    expect(createVocabRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne('user1Course1');

    expect(user.body.username).toBe('user1');
    expect(course.body.name).toBe('user1Course1');

    let createVocabRes = await request.post(`/api/vocabulary`)
    .send({
      ...defaultVocab, 
      courseId: course._id
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createVocabRes.status).toBe(201);
    
    expect(createVocabRes.body).toMatchObject(defaultVocab);

    const findVocab = await Vocabulary.findOne({word: defaultVocab.word});
    expect(findVocab.name).toBe(defaultCourse.name);

    const courseUpdated = await Course.findOne({name: 'user1Course1'});
    expect(courseUpdated.vocabulary).toEqual(expect.arrayContaining([findVocab._id]));

    done();
  });
});