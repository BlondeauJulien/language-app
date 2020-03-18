let vocabularySet = () => {
  return new Array(20).fill(null).map((el, i) => {
    return {
      word: `word${i+1}`,
      translation: [ `translation1`, `translation2` ],
      phrases: [
        {
          origin: `phrase1`,
          translation: `phrase translation1`
        },
        {
          origin: `phrase2`,
          translation: `phrase translation1`
        }
      ],
      conjugationLink: 'link',
      personalNote: 'personal note',
      difficultyLevel: 4,
      tags: ['tag1', 'tag2', 'tag3']
    }
  });
}

module.exports = vocabularySet;