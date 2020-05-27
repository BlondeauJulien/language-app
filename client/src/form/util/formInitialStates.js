export const courseInitialFormState = {
  name: { value: '', isValid: false, isTouched: false },
  language: { value: '', isValid: false, isTouched: false },
  learningFrom: { value: '', isValid: false, isTouched: false }
}

export const vocabularyInitialFormState = {
  word: { value: '', isValid: false, isTouched: false },
  translation: [{ value: '', isValid: false, isTouched: false }],
  phrases: [],
  conjugationLink: { value: '', isValid: true, isTouched: false },
  personalNote: { value: '', isValid: true, isTouched: false },
  difficultyLevel: { value: '', isValid: false, isTouched: false },
  tags: { value: '', isValid: true, isTouched: false }
}

export const quizInitialFormState = {
  image: { value: '', isValid: false, isTouched: false },
  answers: [{
    answer: { value: '', isValid: false, isTouched: false },
    translation: { value: '', isValid: false, isTouched: false },
    isCorrect: false
  },
  {
    answer: { value: '', isValid: false, isTouched: false },
    translation: { value: '', isValid: false, isTouched: false },
    isCorrect: false
  }],
  difficultyLevel: { value: '', isValid: false, isTouched: false },
  tags: { value: '', isValid: true, isTouched: false }
}