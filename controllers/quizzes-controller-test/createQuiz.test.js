const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');
const User = require('../../models/user');

setupDB('languageDBTestUserControllerCreateQuiz');

describe('POST - /api/quizzes', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  let defaultQuiz = {
    answers: [{answer: "randomAnswer1", isCorrect: true, translation: "randomAnswertranslation1"},
    {answer: "randomAnswer2", isCorrect: false, translation: "randomAnswertranslation2"}],
    image: 'https://www.randomimage.com',
    difficultyLevel: 10,
    tags: ['tag1', 'tag2', 'tag3']
  }

 it('should return an error if token is not valid', async done => {

    let createQuizRes = await request.post(`/api/quizzes`)
    .send(defaultQuiz).set('Authorization', 'Bearer invalidtoken');

    expect(createQuizRes.status).toBe(401);
    expect(createQuizRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return error if answers input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let answersArr = new Array(9).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(1).fill({answer: "randomAnswer", isCorrect: true, translation: "randomAnswertranslation"});

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid, should contain at least on correct answer/i);

    answersArr = new Array(3).fill({answer: "a", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: new Array(201).fill('a').join(''), isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomwanswer", isCorrect: false, translation: "a"});
    answersArr[0].isCorrect = true;

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomanswer", isCorrect: false, translation: new Array(201).fill('a').join('')});
    answersArr[0].isCorrect = true;

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = 'nottrue'

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Answers are not valid/i);

    done();
  });

  it('should return error if image is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      image: new Array(201).fill('a').join('')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/Image link is not valid/i);

    done();
  });

  it('should return error if difficulty is not numeric', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      difficultyLevel: 'a'
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/The difficulaty number is not valid/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      tags: new Array(11).fill('abcd')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/The tags are not valid/i);

    createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id,
      tags: new Array(2).fill('ab')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(422);
    expect(createQuizRes.body.message).toMatch(/The tags are not valid/i);

    done();
  });

  it('should return error if course not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = new ObjectID('55153a8014829a865bbf700d')

    expect(user.body.username).toBe('user1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(404);
    expect(createQuizRes.body.message).toMatch(/We did not find the course/i);

    done();
  });

  it('should return error if requestor is not course creator', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.email).toBe('testing2@gmail.com');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(401);
    expect(createQuizRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should return quiz object if everything pass', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      course: course._id
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(201);
    
    expect(createQuizRes.body).toMatchObject({...defaultQuiz, imageIsApprouved: false});

    const findQuiz = await Quiz.findOne({image: 'https://www.randomimage.com'});
    expect(findQuiz.image).toBe(defaultQuiz.image);

    const courseUpdated = await Course.findOne({name: 'user1Course1'});
    expect(courseUpdated.quizzes).toEqual(expect.arrayContaining([findQuiz._id]));

    //admin & mod has a new have a new image to review
    const admin = await User.findOne({role: 'admin'});
    expect(admin.role).toBe('admin');
    expect(admin.imageToReview).toEqual(expect.arrayContaining([findQuiz._id]));

    const moderator = await User.findOne({role: 'moderator'});
    expect(moderator.role).toBe('moderator');
    expect(moderator.imageToReview).toEqual(expect.arrayContaining([findQuiz._id]));


    done();
  });

  it('should not be able to pass value to imageIsApprouved', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});
    const course = await Course.findOne({name: 'user1Course1'});

    expect(user.body.username).toBe('user1');
    expect(course.name).toBe('user1Course1');

    let createQuizRes = await request.post(`/api/quizzes`)
    .send({
      ...defaultQuiz, 
      imageIsApprouved: true,
      course: course._id
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(createQuizRes.status).toBe(401);
    expect(createQuizRes.body.message).toMatch(/You are not authorized to approuve your own image/i);

    done();
  });
});