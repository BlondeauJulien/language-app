import validate from '../../shared/util/inputValidation';
import { defaultInputEl } from '../util/formInitialStates'

export const changeDualInput = (e, form) => {
  const id = e.target.id.split('-')[0];
  const idEl = e.target.id.split('-')[1];
  const position = e.target.id.split('-')[2];
  const value = e.target.value;

  return {
    ...form, 
    [id]: [...form[id].map((el, i) => {
    if(i.toString() === position) {
      el[idEl].value = value;
      el[idEl].isValid = validate(value, id + idEl);
    }
    return el;
  })]}
}

export const changeIsCorrect = (value, position, form) => {
  const id = 'answers';
  return {
    ...form, 
    [id]: [...form[id].map((el, i) => {
    if(i.toString() === position) {
      el.isCorrect = value;
    }
    return el;
  })]}
}

export const touchHandlerDualInput = (e, form) => {
  const id = e.target.id.split('-')[0];
  const idEl = e.target.id.split('-')[1];
  const position = e.target.id.split('-')[2];

  return {
    ...form, 
    [id]: [...form[id].map((el, i) => {
    if(i.toString() === position) {
      el[idEl].isTouched = true;
    }
    return el;
  })]}
}

export const deleteDualInputEl = (element, form) => {
  const id = element.split('-')[0];
  const position = element.split('-')[2];

  return {
    ...form, 
    [id]: [...form[id].filter((el, i) => {
    return i.toString() !== position;
  })]}
}

export const addAnswer = form => {
  const id = 'answers';
  const value = {answer: { ...defaultInputEl}, translation: {...defaultInputEl}, isCorrect: false};
  return {
    ...form, 
    [id]: [...form[id], value]
  }
}

export const addPhrase = form => {
  const id = 'phrases';
  const value = {origin: { ...defaultInputEl}, translation: {...defaultInputEl}};
  return {
    ...form, 
    [id]: [...form[id], value]
  }
}

export const addTranslation = form => {
  const id = 'translation';
  return {...form, [id]: [...form[id], defaultInputEl]};
}

export const changeInputForMulti = (e, form) => {
  const id = e.target.id.split('-')[0];
  const position = e.target.id.split('-')[1];
  const value = e.target.value;

  return {
    ...form, 
    [id]: [...form[id].map((el, i) => {
    if(i.toString() === position) {
      el.value = value;
      el.isValid = validate(value, id);
    }
    return el;
  })]}
}

export const touchHandlerInputForMulti = (e, form) => {
  const id = e.target.id.split('-')[0];
  const position = e.target.id.split('-')[1];

  return {
    ...form, 
    [id]: [...form[id].map((el, i) => {
    if(i.toString() === position) {
      el.isTouched = true;
    }
    return el;
  })]}
}

export const deleteInputForMultiEl = (element, form) => {
  const id = element.split('-')[0];
  const position = element.split('-')[1];

  return {
    ...form, 
    [id]: [...form[id].filter((el, i) => {
    return i.toString() !== position;
  })]}
}