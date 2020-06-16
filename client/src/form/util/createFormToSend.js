export const createCourseFormToSend = (form, countryFlag) => {
  return {
    name: form.name.value,
    language: form.language.value,
    learningFrom: form.learningFrom.value,
    countryFlag: countryFlag.value
  }
}

export const createQuizFormToSend = (form, currentCourseId) => {
  const formToSend = {
    image: form.image.value,
    difficultyLevel: form.difficultyLevel.value,
    answers: form.answers.map(a => {
      return {answer: a.answer.value, translation: a.translation.value, isCorrect: a.isCorrect};
    }),
    course: currentCourseId
  }

  if(form.tags.value) {
    formToSend.tags = form.tags.value.split(',').map(t => {
      return t.trim();
    })
  }

  return formToSend;
}

export const createWordFormToSend = (form, currentCourseId) => {
  const formToSend = {
    word: form.word.value,
    translation: form.translation.map(t => t.value),
    difficultyLevel: form.difficultyLevel.value,
    course: currentCourseId
  } 
  if(form.phrases.length) {
    formToSend.phrases = form.phrases.map(p => {
      return {origin: p.origin.value, translation: p.translation.value};
    })
  }
  if(form.conjugationLink.value) formToSend.conjugationLink = form.conjugationLink.value;
  if(form.personalNote.value) formToSend.personalNote = form.personalNote.value;
  if(form.tags.value) {
    formToSend.tags = form.tags.value.split(',').map(t => {
      return t.trim();
    })
  }

  return formToSend;
}