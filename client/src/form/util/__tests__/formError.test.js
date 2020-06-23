import { formIsInvalid } from '../formError';

const createDefaultPhrases = () => new Array(3).fill({
  origin: {isValid: true},
  translation: {isValid: true}
})

const createDefaultAnswers = (isCorrect) => new Array(3).fill({
  answer: {isValid: true},
  translation: {isValid: true},
  isCorrect: isCorrect
});

describe('Check if form has an error', () => {
  it('should return false for valid form', () => {
    let form = {name: {isValid: true}};
    expect(formIsInvalid(form)).toBe(false);
  });

  it('should return true for invalid form', () => {
    let form = {name: {isValid: false}};
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return false if all translation inputs are valid', () => {
    let form = {translation: [{isValid: true}, {isValid: true}, {isValid: true}]};
    expect(formIsInvalid(form)).toBe(false);
  });

  it('should return true if one of the translation input is invalid', () => {
    let form = {translation: [{isValid: true}, {isValid: true}, {isValid: false}]};
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return false if all phrases are valid (origin and translation)', () => {
    let form = {phrases: createDefaultPhrases()}
    expect(formIsInvalid(form)).toBe(false);
  });

  it('should return true if one of the phrase origin is invalid', () => {
    let form = {phrases: createDefaultPhrases()}
    form.phrases[0].origin.isValid = false;
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return true if one of the phrase translation is invalid', () => {
    let form = {phrases: createDefaultPhrases()}
    form.phrases[0].translation.isValid = false;
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return false if all answers are valid with at least one correct answer', () => {
    let form = {answers: createDefaultAnswers(true)};
    expect(formIsInvalid(form)).toBe(false);
  });

  it('should return true if there is not a single correct answer', () => {
    let form = {answers: createDefaultAnswers(false)};
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return true if one of the answer is invalid', () => {
    let form = {answers: createDefaultAnswers(true)};
    form.answers[0].answer.isValid = false;
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return true if one of the translation is invalid', () => {
    let form = {answers: createDefaultAnswers(true)};
    form.answers[0].translation.isValid = false;
    expect(formIsInvalid(form)).toBe(true);
  });

  it('should return false if flag is valid', () => {
    let form = {};
    let countryFlag = {isValid: true}
    expect(formIsInvalid(form, countryFlag)).toBe(false);
  });

  it('should return true if flag is invalid', () => {
    let form = {};
    let countryFlag = {isValid: false}
    expect(formIsInvalid(form, countryFlag)).toBe(true);
  });
});