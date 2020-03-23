const { setupDB } = require('./test-setup');
const User = require('../../models/user');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');
const Quiz = require('../../models/quiz');

const { seedUsers, seedCourses, seedVocabulary, seedQuizzes } = require('./seed');

setupDB('languageDBTestSeed');

describe('Seeding dummy users working', () => {
  beforeEach(async done => {
    await seedUsers();
    done();
  });

  it('should have a user named user3', async done => {
    const user = await User.findOne({username: 'user3'});
    expect(user.username).toBe('user3');

    done();
  });

  it('should have a moderator', async done => {
    const mod = await User.findOne({role: 'moderator'});
    expect(mod.role).toBe('moderator');

    done();
  });

  it('should have a user named "changed"', async done => {
    const user = await User.findOne({username: 'changed'});
    expect(user.username).toBe('changed');

    done();
  })
});

describe('Seeding dummy courses is working', () => {
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    done();
  });

  it('should have 15 courses', async done => {
    const courses = await Course.find({});
    expect(courses.length).toBe(15);

    done();
  });

  it('should have a creator id for a course', async done => {
    const course = await Course.findOne({name: 'user1Course1'});
    expect(course.creator).toBeTruthy();

    done();
  });

  
});

describe('Seeding dummy vocabulary is working', () => {
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedVocabulary();
    done();
  });

  it('should have a user1Course1 with 20 words', async done => {
    const course1 = await Course.findOne({name: 'user1Course1'});
    expect(course1.vocabulary.length).toBe(20);

    done();
  });

  it('should have a word1 linked by id to user1Course1', async done => {
    const course1 = await Course.findOne({name: 'user1Course1'});
    const word1 = await Vocabulary.findOne({word: 'word1', course: course1._id});
    expect(word1).toBeTruthy();
    
    done();
  });
});

describe('Seeding dummy quizzes is working', () => {
  beforeEach(async done => {
    await seedUsers();
    await seedCourses();
    await seedVocabulary();
    await seedQuizzes();
    done();
  });

  it('should have a user1Course1 with 10 quizzes', async done => {
    const course1 = await Course.findOne({name: 'user1Course1'});
    expect(course1.quizzes.length).toBe(10);

    done();
  });

  it('should have quizzes', async done => {
    const quizzes = await Quiz.find({});
    expect(quizzes).not.toHaveLength(0);

    done();
  });
});