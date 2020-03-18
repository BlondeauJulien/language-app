let quizSet = () => {
  return new Array(10).fill(null).map((el, i) => {
    return {
      answers: [
        {answer: 'answer1', isCorrect: true, translation: 'translation1'},
        {answer: 'answer2', isCorrect: true, translation: 'translation2'},
        {answer: 'answer3', isCorrect: false, translation: 'translation3'},
        {answer: 'answer4', isCorrect: false, translation: 'translation4'}
      ],
      image: 'imagelink',
      imageIsApprouved: true,
      difficultyLevel: 5,
      tags: ['tag1', 'tag2', 'tag3']
    }
  });
}

module.exports = quizSet;