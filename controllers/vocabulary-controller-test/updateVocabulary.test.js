const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedVocabulary } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');

setupDB('languageDBTestUserControllerUpdateVocabulary');

describe('PATCH - /api/vocabulary/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedVocabulary();
    done();
  });

  it('should return an error if token is not valid', async done => {
    const createVocabRes = await request.patch(`/api/vocabulary`)
    .send({word: "random"}).set('Authorization', 'Bearer invalidtoken');

    expect(createVocabRes.status).toBe(401);
    expect(createVocabRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return error if word input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({word: '     '})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Word is not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({word: new Array(31).fill('a').join('')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Word is not valid/i);

    done();
  });

  it('should return error if translation input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({translation: []})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Translations are not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({translation: new Array(9).fill('abcd')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Translations are not valid/i);

    
    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({translation: new Array(5).fill('     ')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Translations are not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({translation: new Array(5).fill(new Array(31).fill('a').join(''))})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Translations are not valid/i);

    done();
  });

  it('should return error if phrases input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({phrases: new Array(9).fill({origin: "abcd", translation: "abcd"})})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Phrases are not valid/i);

    
    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({ phrases: new Array(1).fill({origin: new Array(201).fill('a').join(''), translation: "abcd"})})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Phrases are not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({phrases: new Array(1).fill({origin: "abcd", translation: new Array(201).fill('a').join('')})})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Phrases are not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({phrases: new Array(1).fill({origin: "", translation: "abcd"})})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Phrases are not valid/i);

    updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({phrases: new Array(1).fill({origin: "abcd", translation: ""})})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Phrases are not valid/i);

    done();
  });

  it('should return error if conjugationlink is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({conjugationLink: new Array(101).fill('a').join('')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Link to conjugation is not valid/i);

    done();
  });

  it('should return error if personal note not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({personalNote: new Array(401).fill('a').join('')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/Your note is not valid/i);

    done();
  });

  it('should return error if difficulty is not numeric', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({difficultyLevel: 'a'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/The difficulaty number is not valid/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({tags: new Array(11).fill('abcd')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/The tags are not valid/i);

    updatedVocabRes = await request.post(`/api/vocabulary`)
    .send({tags: new Array(2).fill('ab')})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(422);
    expect(updatedVocabRes.body.message).toMatch(/The tags are not valid/i);

    done();
  });

  it('should return error if vocabulary not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const vocabToUpdate = new ObjectID('55153a8014829a865bbf700d');

    expect(user.body.username).toBe('user1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate}`)
    .send({word: 'updatedword'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(404);
    expect(updatedVocabRes.body.message).toMatch(/We did not find the course/i);

    done();
  });

  it('should return error if requestor is not course creator', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(vocabToUpdate.word).toBe('word1');

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send({word: 'updatedword'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(401);
    expect(updatedVocabRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should return vocabulary object if everything pass', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(vocabToUpdate.word).toBe('word1');

    let fieldsToUpdate = {
      word: 'updatedword',
      translation: ["updatedtranslation1", "updatedtranslation2"],
      phrases: [{origin: "updatedphrase1", translation: "updatedphrasetranslation1"},
      {origin: "updatedphrase2", translation: "updatedphrasetranslation2"}],
      conjugationLink: 'www.updated.com',
      personalNote: 'This is a personal note updated',
      difficultyLevel: 1,
      tags: ['updatedtag1', 'updatedtag2', 'updatedtag3']
    }

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send(fieldsToUpdate)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(200);
    
    expect(updatedVocabRes.body).toMatchObject(fieldsToUpdate);

    const findVocab = await Vocabulary.findOne({word: updatedVocabRes.word});
    expect(findVocab.word).toBe(fieldsToUpdate.word);

    done();
  });

  it('should return vocabulary object if everything pass even with only one fiedl passed', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToUpdate = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(vocabToUpdate.word).toBe('word1');

    let fieldsToUpdate = {
      word: 'updatedword'
    }

    let updatedVocabRes = await request.patch(`/api/vocabulary/${vocabToUpdate._id}`)
    .send(fieldsToUpdate)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedVocabRes.status).toBe(200);
    
    expect(updatedVocabRes.body.word).toMatchObject(fieldsToUpdate);

    const findVocab = await Vocabulary.findOne({word: updatedVocabRes.word});
    expect(findVocab.word).toBe(fieldsToUpdate.word);

    done();
  });
});