export const createDefaultInputEl = (isValid = false) => {
  return { value: '', isValid, isTouched: false };
}

export const createCourseInitialFormState = () => {
  return {
    name: createDefaultInputEl(),
    language: createDefaultInputEl(),
    learningFrom: createDefaultInputEl()
  }
}

export const createVocabularyInitialFormState = () => {
  return {
    word: createDefaultInputEl(),
    translation: [createDefaultInputEl()],
    phrases: [],
    conjugationLink: createDefaultInputEl(true),
    personalNote: createDefaultInputEl(true),
    difficultyLevel: createDefaultInputEl(),
    tags: createDefaultInputEl(true)
  }
}

export const createQuizInitialFormState = () => {
  const createAnswerEl = () => {
    return {
      answer: createDefaultInputEl(),
      translation: createDefaultInputEl(),
      isCorrect: false
    }
  }
  return {
    image: createDefaultInputEl(),
    answers: [createAnswerEl(), createAnswerEl()],
    difficultyLevel: createDefaultInputEl(),
    tags: createDefaultInputEl(true)
  }
}

export const fillFormWithWordToEdit = (form, vocabularyToEdit) => {
  return {
    ...form,
    word: {...form.word, value: vocabularyToEdit.word, isValid: true},
    translation: [...vocabularyToEdit.translation].map(t => {
      return { value: t, isValid: true, isTouched: false}
    }),
    phrases: [...vocabularyToEdit.phrases].map(p => {
      return {
        origin: { value: p.origin, isValid: true, isTouched: false},
        translation: { value: p.translation, isValid: true, isTouched: false}
      }
    }),
    conjugationLink: {...form.conjugationLink, value: vocabularyToEdit.conjugationLink || '', isValid: true},
    personalNote: {...form.personalNote, value: vocabularyToEdit.personalNote || '', isValid: true},
    difficultyLevel: {...form.difficultyLevel, value: vocabularyToEdit.difficultyLevel, isValid: true},
    tags: {...form.tags, value: vocabularyToEdit.tags.join(', '), isValid: true},
  }
}

export const fillFormWithQuizToEdit = (form, quizToEdit) => {
  return {
    ...form,
    image: {...form.image, value: quizToEdit.image, isValid: true},
    answers: [...quizToEdit.answers].map(a => {
      return {
        answer: { value: a.answer, isValid: true, isTouched: false },
        translation: { value: a.translation, isValid: true, isTouched: false },
        isCorrect: a.isCorrect
      }
    }),
    difficultyLevel: {...form.difficultyLevel, value: quizToEdit.difficultyLevel, isValid: true},
    tags: {...form.tags, value: quizToEdit.tags.join(', '), isValid: true},
  }
}

export const fillFormWithCourseToEdit = (form, courseToEdit) => {
  return {
    ...form,
    name: {...form.name, value: courseToEdit.name, isValid: true},
    language: {...form.language, value: courseToEdit.language, isValid: true},
    learningFrom: {...form.learningFrom, value: courseToEdit.learningFrom, isValid: true}
  }
}