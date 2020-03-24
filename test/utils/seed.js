const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');
const Quiz = require('../../models/quiz');

const users = require('../dummyData/users');
const { adminCoursesSet1, modCoursesSet2, coursesSet3, coursesSet4, coursesSet5} = require('../dummyData/courses');
const vocabularySet = require('../dummyData/vocabulary');
const quizSet = require('../dummyData/quizzes');

const seedUsers = async () => {
  let usersSecure = [];

  for(let user of users) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(user.password, 12);
    } catch (err) {
      console.log('error while hashing password in seed user')
    }
    let secureUser = {...user, password: hashedPassword}
    usersSecure.push(secureUser);
  }

  await User.insertMany(usersSecure);

  let user2 = await User.findOne({username: 'user2'});
  user2.username = 'changed';
  await user2.save();
}

const seedCourses = async () => {
  let admin = await User.findOne({role: 'admin'});
  let mod = await User.findOne({email: 'testing4@gmail.com'});
  let user1 = await User.findOne({email: 'testing1@gmail.com'});
  let user2 = await User.findOne({email: 'testing2@gmail.com'});
  let user3 = await User.findOne({email: 'testing3@gmail.com'});

  const addCreatorId = async (coursesArr, creator) => {
    let creatorCourses = coursesArr.map(course => {
      course.creator = creator._id;
      return course;
    });

    const createdCourses = await Course.create(creatorCourses);

    for(const course of createdCourses) {
      creator.courseCreated.push(course._id);
    }

    await creator.save();
  }

  await addCreatorId([...adminCoursesSet1], admin);
  await addCreatorId([...coursesSet3], user1);
  await addCreatorId([...modCoursesSet2], mod);
  await addCreatorId([...coursesSet4], user2);
  await addCreatorId([...coursesSet5], user3);
}

const seedVocabulary = async () => {
  let modCourse1 = await Course.findOne({name: 'moderatorCourse1'});
  let user1Course1 = await Course.findOne({name: 'user1Course1'});
  let user1Course3 = await Course.findOne({name: 'user3Course1'});

  let vocabSet = vocabularySet();


  const addIds = async (vocabSet, course) => {
    vocabSet = vocabSet.map(vocab => {
      vocab.course = course._id;
      return vocab;
    });

    const createdVocab = await Vocabulary.create(vocabSet);

    for(const vocab of createdVocab) {
      course.vocabulary.push(vocab._id);
    }

    await course.save();
  }

  await addIds([...vocabSet], modCourse1); 
  await addIds([...vocabSet], user1Course1); 
  await addIds([...vocabSet], user1Course3); 
}

const seedQuizzes = async () => {
  let modCourse1 = await Course.findOne({name: 'moderatorCourse1'});
  let user1Course1 = await Course.findOne({name: 'user1Course1'});
  let user1Course3 = await Course.findOne({name: 'user3Course1'});

  let qzSet = quizSet();

  const addIds = async (quizSet, course) => {
    quizSet = quizSet.map(quiz => {
      quiz.course = course._id;
      return quiz;
    });

    const createdQuizzes = await Quiz.create(quizSet);

    for(const quiz of createdQuizzes) {
      course.quizzes.push(quiz._id);
    }

    await course.save();
  }

  await addIds([...qzSet], modCourse1); 
  await addIds([...qzSet], user1Course1); 
  await addIds([...qzSet], user1Course3); 

}

exports.seedUsers = seedUsers;
exports.seedCourses = seedCourses;
exports.seedVocabulary = seedVocabulary;
exports.seedQuizzes = seedQuizzes;
