import validate from '../../shared/util/inputValidation';


export const defaultOnChangeWithValidation = (id, value, form, setForm) => {
  setForm({...form, [id]: {...form[id], value: value, isValid: validate(value, id)}});
}