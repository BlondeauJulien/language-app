export const filterWordMethod = (word, searchVocabulary) => {
  let wordRegexp = new RegExp(searchVocabulary.word.trim(), 'i');
  let translationRegexp = new RegExp(searchVocabulary.translation.trim(), 'i');
  let difficultyLevelRegexp = new RegExp(searchVocabulary.difficultyLevel.trim(), 'i');
  let tagRegexp = new RegExp(searchVocabulary.tags.trim(), 'i');
  const tagsString = word.tags.join(' ');
  if(
    wordRegexp.test(word.word) &&
    translationRegexp.test(word.translation) &&
    tagRegexp.test(tagsString) &&
    difficultyLevelRegexp.test(word.difficultyLevel.toString())
  ) {
    return true;
  }
  return false;
}

export const filterQuizMethod = (quiz, searchQuiz) => {
  let difficultyLevelRegexp = new RegExp(searchQuiz.difficultyLevel.trim(), 'i');
  let tagRegexp = new RegExp(searchQuiz.tags.trim(), 'i');
  const tagsString = quiz.tags.join(' ');
  if(
    tagRegexp.test(tagsString) &&
    difficultyLevelRegexp.test(quiz.difficultyLevel.toString())
  ) {
    return true;
  }
  return false;
}