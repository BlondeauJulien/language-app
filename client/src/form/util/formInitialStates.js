const inputEl = { value: '', isValid: false, isTouched: false }

export const createCourseInitialFormState = () => {
  return {
    name: { ...inputEl },
    language: { ...inputEl },
    learningFrom: { ...inputEl }
  }
}

export const createVocabularyInitialFormState = () => {
  return {
    word: { ...inputEl },
    translation: [{ ...inputEl }],
    phrases: [],
    conjugationLink: { ...inputEl, isValid: true },
    personalNote: { ...inputEl, isValid: true },
    difficultyLevel: { ...inputEl },
    tags: { ...inputEl, isValid: true }
  }
}

export const createQuizInitialFormState = () => {
  const createAnswerEl = () => {
    return {
      answer: { ...inputEl },
      translation: { ...inputEl },
      isCorrect: false
    }
  }
  return {
    image: { ...inputEl },
    answers: [createAnswerEl(), createAnswerEl()],
    difficultyLevel: { ...inputEl },
    tags: { ...inputEl, isValid: true }
  }
}