export const formIsInvalid = (form, countryFlag) => {
  let hasError = false;
  for(const input in form) {
    if(input === "translation") {
      hasError = form[input].some(el => !el.isValid);
      console.log('translation', hasError)
    } else if (input === "phrases"){
      hasError = form[input].some(el => !el.origin.isValid || !el.translation.isValid);
      console.log('phrases', hasError)
    } else if (input === "answers"){
      let isNotValid = form[input].some(el => !el.answer.isValid || !el.translation.isValid);
      let hasOneCorrect = form[input].some(el => el.isCorrect);
      console.log('answersvalid', isNotValid)
      console.log('answerhascorrect', hasOneCorrect)
      if(isNotValid || !hasOneCorrect) {
        hasError = true;
      }
    } else {
      hasError = !form[input].isValid;
    }
    if(hasError) break;
  }

  if(countryFlag && !countryFlag.isValid) {
    hasError = true;
  }
  return hasError;
}