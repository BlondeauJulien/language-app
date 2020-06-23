import { 
  createCourseFormToSend, 
  createWordFormToSend, 
  createQuizFormToSend
} from '../createFormToSend';

describe('Create course object to send to API', () => {
  it('should create a valid course object', () => {
    let form = {
      name: { value: 'course name'},
      language: { value: 'french'},
      learningFrom: { value: 'english'}
    }
    let countryFlag = {value: 'FR'};

    expect(createCourseFormToSend(form, countryFlag)).toMatchObject({
      name: 'course name',
      language: 'french',
      learningFrom: 'english'
    })

  });
});

describe('Create quiz object to send to API', () => {

  it('should create a valid quiz object with all the fiedls filled', () => {
    let form = {
      image: { value: 'imagelink'},
      difficultyLevel: { value: '1'},
      answers: [
        {answer: {value: 'answer1'}, translation: {value: 'translation1'}, isCorrect: true},
        {answer: {value: 'answer2'}, translation: {value: 'translation2'}, isCorrect: false}
      ],
      tags: { value: 'tag1, tag2, tag3'}
    }
    let courseId = 'id123'

    expect(createQuizFormToSend(form, courseId)).toMatchObject({
      image: 'imagelink',
      difficultyLevel: '1',
      answers: [
        {answer: 'answer1', translation: 'translation1', isCorrect: true},
        {answer: 'answer2', translation: 'translation2', isCorrect: false}
      ],
      tags : ['tag1', 'tag2', 'tag3'],
      course: 'id123'
    })
  });
});

describe('Create word object to send to API', () => {
  const form = {
    word: { value: 'word1'},
    difficultyLevel: { value: '1'},
    translation: [
    {value: 'translation1'},
    {value: 'translation2'}
    ],
    phrases: [],
    conjugationLink: { value: ''},
    personalNote: { value: ''},
    tags: { value: ''}
  }
  let courseId = 'id123';

  it('should create a valid word object with the required fields only', () => {
    expect(createWordFormToSend(form, courseId)).toMatchObject({
      word: 'word1',
      difficultyLevel: '1',
      translation: ['translation1', "translation2"],
      course: 'id123'
    })
  });

  it('should create a valid word object with all fields filled', () => {
    form.phrases = [
      {origin: {value: 'phrase1'}, translation: {value: 'translation1'}},
      {origin: {value: 'phrase2'}, translation: {value: 'translation2'}}
    ]
    form.conjugationLink = {value: 'link'};
    form.personalNote = {value: 'This is a note'};
    form.tags = {value: 'tag1, tag2, tag3'};

    expect(createWordFormToSend(form, courseId)).toMatchObject({
      word: 'word1',
      difficultyLevel: '1',
      translation: ['translation1', "translation2"],
      course: 'id123',
      conjugationLink : 'link',
      personalNote : 'This is a note',
      tags : ['tag1', 'tag2', 'tag3'],
      phrases: [
        {origin: 'phrase1', translation: 'translation1'},
        {origin: 'phrase2', translation: 'translation2'}
      ]    })
  });
});