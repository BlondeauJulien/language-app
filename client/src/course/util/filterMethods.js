export const filterWordMethod = (word, searchVocabulary) => {
  let wordRegexp = new RegExp(searchVocabulary.word.trim(), 'i');
  let translationRegexp = new RegExp(searchVocabulary.translation.trim(), 'i');
  let difficultyLevelRegexp = new RegExp(searchVocabulary.difficultyLevel.trim(), 'i');
  let tagRegexp = new RegExp(searchVocabulary.tags.trim(), 'i');
  if(
    wordRegexp.test(word.word) &&
    translationRegexp.test(word.translation) &&
    tagRegexp.test(word.tags) &&
    difficultyLevelRegexp.test(word.difficultyLevel.toString())
  ) {
    return true;
  }
  return false;
}

export const filterQuizMethod = (quiz, searchQuiz) => {
  let difficultyLevelRegexp = new RegExp(searchQuiz.difficultyLevel.trim(), 'i');
  let tagRegexp = new RegExp(searchQuiz.tags.trim(), 'i');
  if(
    tagRegexp.test(quiz.tags) &&
    difficultyLevelRegexp.test(quiz.difficultyLevel.toString())
  ) {
    return true;
  }
  return false;
}