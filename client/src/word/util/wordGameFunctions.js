export const nextWordExist = (wordSeen, wordsArr, setWordSeen) => {
  if(wordSeen.index < wordSeen.list.length - 1) {
    let nextWordId = wordSeen.list[wordSeen.index + 1];
    let nextWord = wordsArr.find(w => w._id === nextWordId);
    return nextWord;
  }
  return null;
}

export const getNextWordLocation = () => {
  let nextWordLocation;
  const randomNbr = Math.floor(Math.random() * 100) + 1;

  if(randomNbr <= 50 ) nextWordLocation = 'all';
  if(randomNbr > 50 && randomNbr <= 70 ) nextWordLocation = 'bad';
  if(randomNbr > 70 && randomNbr <= 85 ) nextWordLocation = 'poorly';
  if(randomNbr > 85 && randomNbr <= 95 ) nextWordLocation = 'somewhat';
  if(randomNbr > 95 ) nextWordLocation = 'decently';

  return nextWordLocation;
}

export const getNextWord = (currentCourseVoc, wordsListFromLS = null) => {
  let nextWord;
  let nextWordId;

  let listLength = wordsListFromLS ? wordsListFromLS.length : currentCourseVoc.length;
  let randomIndex = Math.floor(Math.random() * listLength);

  if(wordsListFromLS) {
    nextWordId = wordsListFromLS[randomIndex];
    nextWord = currentCourseVoc.find(w => w._id === nextWordId);
  } else {
    nextWord = currentCourseVoc[randomIndex];
  }

  return {value: nextWord, id: nextWordId}
}