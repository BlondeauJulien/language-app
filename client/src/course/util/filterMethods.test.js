import { filterWordMethod, filterQuizMethod } from './filterMethods';

const dummyData = [
  {
    word: 'word1',
    translation: ['translation1'],
    tags: ['tag1'],
    difficultyLevel: 1
  },
  {
    word: 'word2',
    translation: ['translation1', 'translation2'],
    tags: ['tag1', 'tag2'],
    difficultyLevel: 1
  },
  {
    word: 'word3',
    translation: ['translation3'],
    tags: ['tag1', 'tag3'],
    difficultyLevel: 3
  },
  {
    word: 'word4',
    translation: ['translation1', 'translation4'],
    tags: ['tag1', 'tag3', 'tag4'],
    difficultyLevel: 4
  }
];

const getFilteredWord = () => {
  const filterWord = word => filterWordMethod(word, searchQueries);
  return dummyData.filter(filterWord);
}

const getFilteredQuiz = () => {
  const filterQuiz = quiz => filterQuizMethod(quiz, searchQueries);
  return dummyData.filter(filterQuiz);
}

let searchQueries;
beforeEach(() => {
  searchQueries = {
    word: '',
    translation: '',
    tags: '',
    difficultyLevel: ''
  }
});

describe('Create valid query string', () => {
  it('should return all the words if no searchQuery', () => {
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(4);
  });

  it('should return all the words matching a word query search', () => {
    searchQueries.word = '1';
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(1);
    expect(filteredWords[0].word).toBe('word1');

    searchQueries.word = 'word';
    filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(4);
  });

  it('should return all the words matching a translation query search', () => {
    searchQueries.translation = '4';
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(1);
    expect(filteredWords[0].word).toBe('word4');

    searchQueries.translation = 'translation1';
    filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(3);
  });

  it('should return all the words matching a tag query search', () => {
    searchQueries.tags = '4';
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(1);
    expect(filteredWords[0].word).toBe('word4');

    searchQueries.tags = 'tag1';
    filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(4);
  });

  it('should return all the words matching a difficultyLevel query search', () => {
    searchQueries.difficultyLevel = '4';
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(1);
    expect(filteredWords[0].word).toBe('word4');

    searchQueries.difficultyLevel = '1';
    filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(2);
  });

  it('should return all the words matching multiple query search', () => {
    searchQueries.word = 'word';
    searchQueries.translation = 'translation1';
    searchQueries.tags = 'tag1';
    searchQueries.difficultyLevel = '1';
    let filteredWords = getFilteredWord();
    expect(filteredWords).toHaveLength(2);

  });
})

describe('Create valid query string', () => {
  it('should return all the quizzes if no searchQuery', () => {
    let filteredQuiz = getFilteredQuiz();
    expect(filteredQuiz).toHaveLength(4);
  });

  it('should return all the quizzes matching a tag search', () => {
    searchQueries.tags = 'tag3';
    let filteredQuiz = getFilteredQuiz();
    expect(filteredQuiz).toHaveLength(2);
  });

  it('should return all the quizzes matching a difficultyLevel search', () => {
    searchQueries.difficultyLevel = '1';
    let filteredQuiz = getFilteredQuiz();
    expect(filteredQuiz).toHaveLength(2);
  });

  it('should return all the quizzes matching multiple queries', () => {
    searchQueries.tags = 'tag1';
    searchQueries.difficultyLevel = '1';
    let filteredQuiz = getFilteredQuiz();
    expect(filteredQuiz).toHaveLength(2);
  });
})