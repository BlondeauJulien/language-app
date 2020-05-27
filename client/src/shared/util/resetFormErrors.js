const resetFormErrors = (setStateFormError, setContextError, contextError) => {
  setStateFormError(false);
  if(contextError) {
    setContextError(false);
  }
}

export default resetFormErrors;