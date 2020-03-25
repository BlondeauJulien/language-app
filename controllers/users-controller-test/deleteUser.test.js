const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);

const { setupDB } = require('../../test/utils/test-setup');
const User = require('../../models/user');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');
const Vocabulary = require('../../models/vocabulary');
const { seedUsers, seedCourses, seedQuizzes, seedVocabulary } = require('../../test/utils/seed');

setupDB('languageDBTestUserControllerPatchUserId');

describe('DELETE (user + all his courses + all courses data) - /api/users/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedQuizzes();
    await seedVocabulary();
    done();
  });

  it('should return an error if token is not valid valid ', async done => {
    const userToDelete = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: '123456'});

    expect(userToDelete.body.username).toBe('user1');

    const deletedUserResponse = await request.delete(`/api/users/${userToDelete.body.userId}`)
    .send({ password: '123456' })
    .set('Authorization', `Bearer wrongtoken6424641735`);

    expect(deletedUserResponse.status).toBe(401);
    expect(deletedUserResponse.body.message).toMatch(/You are not authorized/i);
    
    done();
  });

  it('should return an error if token is valid but doesn\'t match the user to delete', async done => {
    const userToDelete = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: '123456'});

    const wrongUser = await request.post('/api/users/login')
    .send({email: 'testing2@gmail.com', password: '123456'});

    expect(userToDelete.body.username).toBe('user1');
    expect(wrongUser.body.username).toBe('changed');

    const deletedUserResponse = await request.delete(`/api/users/${userToDelete.body.userId}`)
    .send({ password: '123456' })
    .set('Authorization', `Bearer ${wrongUser.body.token}`);

    expect(deletedUserResponse.status).toBe(401);
    expect(deletedUserResponse.body.message).toMatch(/You are not authorized/i);
    
    done();
  });

  it('should not be able to delete course if user pass wrong password', async done => {
    const userToDelete = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: '123456'});

    expect(userToDelete.body.username).toBe('user1');

    const deletedUserResponse = await request.delete(`/api/users/${userToDelete.body.userId}`)
    .send({ password: 'dzqfdfsd' })
    .set('Authorization', `Bearer ${userToDelete.body.token}`);

    expect(deletedUserResponse.status).toBe(401);
    expect(deletedUserResponse.body.message).toMatch(/Wrong password/i);
    
    done();
  });

  it('should delete course & all the quizzes and vocabulary attached to it', async done => {
    const userToDelete = await request.post('/api/users/login')
    .send({email: 'testing1@gmail.com', password: '123456'});

    const user1Course1 = await Course.findOne({name: 'user1Course1'});

    expect(userToDelete.body.username).toBe('user1');
    expect(user1Course1.body.name).toBe('user1Course1');

    const deletedUserResponse = await request.delete(`/api/users/${userToDelete.body.userId}`)
    .send({ password: '123456' })
    .set('Authorization', `Bearer ${userToDelete.body.token}`);

    expect(deletedUserResponse.status).toBe(200);
    expect(deletedUserResponse.body.message).toMatch(/deleted successfully/i);

    const deletedUser =  await User.findOne({email: 'testing1@gmail.com'});
    const deletedCourse = await Course.findOne({name: 'user1Course1'});
    const deletedQuiz = await Quiz.findOne({course: user1Course1._id});
    const deletedVocabulary = await Vocabulary.findOne({course: user1Course1._id});

    expect(deletedUser).toBeFalsy();
    expect(deletedCourse).toBeFalsy();
    expect(deletedQuiz).toBeFalsy();
    expect(deletedVocabulary).toBeFalsy();
    
    done();
  });
});