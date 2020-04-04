const app = require('../../server');

const supertest = require('supertest');
const request = supertest(app);
const ObjectID = require('mongodb').ObjectID; 

const { setupDB } = require('../../test/utils/test-setup');
const { seedUsers, seedCourses, seedQuizzes } = require('../../test/utils/seed');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');
const User = require('../../models/user');


setupDB('languageDBTestUserControllerUpdateQuiz');

describe('PATCH - /api/quizzes/:id', () => { 
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedQuizzes();
    done();
  });

  it('should return an error if token is not valid', async done => {
    const updatedQuizRes = await request.patch(`/api/quizzes/:wrongid`)
    .send({image: "random"}).set('Authorization', 'Bearer invalidtoken');

    expect(updatedQuizRes.status).toBe(401);
    expect(updatedQuizRes.body.message).toMatch(/Authentication failed/i);

    done();
  });

  it('should return error if answers input is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let answersArr = new Array(9).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({ 
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(1).fill({answer: "randomAnswer", isCorrect: true, translation: "randomAnswertranslation"});

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid, should contain at least on correct answer/i);

    answersArr = new Array(3).fill({answer: "a", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: new Array(201).fill('a').join(''), isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = true;

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomwanswer", isCorrect: false, translation: "a"});
    answersArr[0].isCorrect = true;

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomanswer", isCorrect: false, translation: new Array(201).fill('a').join('')});
    answersArr[0].isCorrect = true;

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    answersArr = new Array(3).fill({answer: "randomAnswer", isCorrect: false, translation: "randomAnswertranslation"});
    answersArr[0].isCorrect = 'nottrue'

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      answers: answersArr
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Answers are not valid/i);

    done();
  });

  it('should return error if image is not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      image: new Array(201).fill('a').join('')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/Image link is not valid/i);

    done();
  });

  it('should return error if difficulty is not numeric', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      difficultyLevel: 'a'
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/The difficulaty number is not valid/i);

    done();
  });

  it('should return error if tags are not valid', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      tags: new Array(11).fill('abcd')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/The tags are not valid/i);

    updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      tags: new Array(2).fill('ab')
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(422);
    expect(updatedQuizRes.body.message).toMatch(/The tags are not valid/i);

    done();
  });

  it('should return error if quiz not found', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    const quizToUpdate = new ObjectID('55153a8014829a865bbf700d');

    expect(user.body.username).toBe('user1');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate}`)
    .send({image: 'updatedimage'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(404);
    expect(updatedQuizRes.body.message).toMatch(/We did not find the quiz/i);

    done();
  });

  it('should return error if requestor is not course creator', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing2@gmail.com', password: '123456'});

    expect(user.body.email).toBe('testing2@gmail.com');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({image: 'updatedimage'})
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(401);
    expect(updatedQuizRes.body.message).toMatch(/You are not authorized/i);

    done();
  });

  it('should not be able to pass value to imageIsApprouved', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      imageIsApprouved: true
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(401);
    expect(updatedQuizRes.body.message).toMatch(/You are not authorized to approuve your own image/i);

    done();
  }); 

  it('should change imageIsApprouved to false if image is updated', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');
    expect(quizToUpdate.imageIsApprouved).toBe(true)

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send({
      image: 'updatedimage', 
    })
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(200);
    
    expect(updatedQuizRes.body).toMatchObject({image: 'updatedimage', imageIsApprouved: false});

    const findQuiz = await Quiz.findOne({image: 'updatedimage'});
    expect(findQuiz.image).toBe('updatedimage');
    expect(findQuiz.imageIsApprouved).toBe(false);

    //admin & mod have a new image to review
    const admin = await User.findOne({role: 'admin'});
    expect(admin.role).toBe('admin');
    expect(admin.imageToReview).toEqual(expect.arrayContaining([findQuiz._id]));

    const moderator = await User.findOne({role: 'moderator'});
    expect(moderator.role).toBe('moderator');
    expect(moderator.imageToReview).toEqual(expect.arrayContaining([findQuiz._id]));

    done();
  });

 it('should be able to update all field minus image (and imageIsApprouved keep its state) and get back object', async done => {
    const user = await request.post('/api/users/login')
    .send({email:'testing1@gmail.com', password: '123456'});

    expect(user.body.username).toBe('user1');

    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.name).toBe('user1Course1');

    const quizToUpdate = await Quiz.findOne({image: 'imagelink', course: course._id});
    expect(quizToUpdate.image).toBe('imagelink');

    let fieldsToUpdate = {
      answers: [
        {answer: 'updatedanswer1', isCorrect: true, translation: 'updatedtranslation1'},
        {answer: 'updatedanswer2', isCorrect: false, translation: 'updatedtranslation2'},
      ],
      difficultyLevel: 9,
      tags: ['updatedtag1', 'updatedtag2', 'tag3']
    }

    let updatedQuizRes = await request.patch(`/api/quizzes/${quizToUpdate._id}`)
    .send(fieldsToUpdate)
    .set('Authorization', `Bearer ${user.body.token}`);

    expect(updatedQuizRes.status).toBe(200);
    
    expect(updatedQuizRes.body).toMatchObject({...fieldsToUpdate , image: 'imagelink', imageIsApprouved: true});

    const findQuiz = await Quiz.findOne({difficultyLevel: 9});
    expect(findQuiz.difficultyLevel).toBe(9);
    expect(findQuiz.imageIsApprouved).toBe(true);

    done();
  });
});