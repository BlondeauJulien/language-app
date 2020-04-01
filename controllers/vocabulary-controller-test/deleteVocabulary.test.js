const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedVocabulary } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');

setupDB('languageDBTestUserControllerDeleteVocabulary');

describe('DELETE - /api/vocabulary/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedVocabulary();
    done();
  });

  it('return an error if token is not valid', async done => {
    const deletedVocabRes = await request.delete(`/api/vocabulary/randomID`)
    .set('Authorization', 'Bearer invalidtoken');

    expect(deletedVocabRes.status).toBe(401);
    expect(deletedVocabRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('return an error if requestor id does not match the course creator id of vocab to delete', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');
    const vocabToDelete = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(vocabToDelete.word).toBe('word1');

    const deletedVocabRes = await request.delete(`/api/vocabulary/${vocabToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedVocabRes.status).toBe(401);
    expect(deletedVocabRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should return a 404 error if vocab not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');
    const vocabToDelete = new ObjectID('55153a8014829a865bbf700d');

    const deletedVocabRes = await request.delete(`/api/vocabulary/${vocabToDelete}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedVocabRes.status).toBe(404);
    expect(deletedVocabRes.body.message).toMatch(/We did not find the word you tried to delete/i);

    done();
  });

  it('should return success message, vocab deleted successfully and its id not included in course.vocabulary', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const vocabToDelete = await Vocabulary.findOne({word: 'word1', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(vocabToDelete.word).toBe('word1');

    const deletedVocabRes = await request.delete(`/api/vocabulary/${vocabToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedVocabRes.status).toBe(200);
    expect(deletedVocabRes.body.message).toMatch(/Word deleted successfully/i);

    const deletedVocab = await Vocabulary.findById(vocabToDelete._id);

    expect(deletedVocab).toBeNull();

    const updatedCourse = await Course.findById(course._id);

    expect(updatedCourse.vocabulary).toEqual(expect.not.arrayContaining([vocabToDelete._id]));

    done();
  });

});