const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedQuizzes } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');

setupDB('languageDBTestUserControllerDeleteQuiz');

describe('DELETE - /api/quizzes/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedQuizzes();
    done();
  });

  it('return an error if token is not valid', async done => {
    const deleteQuizRes = await request.delete(`/api/quizzes/randomID`)
    .set('Authorization', 'Bearer invalidtoken');

    expect(deleteQuizRes.status).toBe(401);
    expect(deleteQuizRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('return an error if requestor id does not match the course creator id of quiz to delete', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');
    const quizToDelete = await Quiz.findOne({image: 'imagelink', course: course._id});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(quizToDelete.image).toBe('imagelink');

    const deleteQuizRes = await request.delete(`/api/quizzes/${quizToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deleteQuizRes.status).toBe(401);
    expect(deleteQuizRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should return a 404 error if quiz not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');
    const quizToDelete = new ObjectID('55153a8014829a865bbf700d');

    const deleteQuizRes = await request.delete(`/api/quizzes/${quizToDelete}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deleteQuizRes.status).toBe(404);
    expect(deleteQuizRes.body.message).toMatch(/We did not find the quiz you tried to delete/i);

    done();
  });

  it('should return success message, quiz deleted successfully and its id not included in course.quizzes', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToDelete = await Quiz.findOne({image: 'imagelink', course: course._id});

    expect(user.body.username).toBe('user1');
    expect(quizToDelete.image).toBe('imagelink');

    const deletedQuizRes = await request.delete(`/api/quizzes/${quizToDelete._id}`)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(deletedQuizRes.status).toBe(200);
    expect(deletedQuizRes.body.message).toMatch(/Quiz deleted successfully/i);

    const deletedQuiz = await Quiz.findById(quizToDelete._id);

    expect(deletedQuiz).toBeNull();

    const updatedCourse = await Course.findById(course._id);

    expect(updatedCourse.quizzes).toEqual(expect.not.arrayContaining([quizToDelete._id]));

    done();
  });

});