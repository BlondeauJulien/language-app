import validator from 'validator';
import Flags from './countriesFlags';

export default (value, id) => {
  //Auth
  if(id === 'username') return validator.isLength(value, {min: 4, max: 16});
  if(id === 'email') return validator.isEmail(value);
  if(id === 'password') return validator.isLength(value, {min: 6});

  // Course
  if(id === 'name') return validator.isLength(value, {min: 4, max: 40});
  if(id === 'language') return validator.isLength(value, {min: 2, max: 24});
  if(id === 'learningFrom') return validator.isLength(value, {min: 2, max: 24});
  if(id === 'countryFlag') {
    for(let i = 0; i < Flags.length; i++) {
      if(Flags[i].code === value) {
        return true;
      }
    }
    return false;
  }

  //Vocabulary
  if(id === 'word') return validator.isLength(value, {min: 1, max: 30});
  if(id === 'translation') return validator.isLength(value, {min: 1, max: 30});
  if(id === 'personalNote') return validator.isLength(value, { max: 400});
  if(id === 'conjugationLink') return true;
  if(id === 'phrasesorigin' ||
  id === 'phrasestranslation') return validator.isLength(value, {min: 1, max: 200});

  //Quiz
  if(id === 'image') return validator.isURL(value);
  if(id === 'answersanswer' ||
  id === 'answerstranslation') return validator.isLength(value, {min: 2, max: 200});
  
  //shared
  if(id === 'difficultyLevel') return validator.isInt(value, {gt: 0, lt: 11});
  if(id === 'tags') {
    if(value.length === 0 ) return true;
    let tags = value.split(',').map(tag => tag.trim());
    if(tags.length > 8 ) return false;
    for(let i = 0; i < tags.length; i++) {
      if(tags[i].length < 4 || tags[i].length > 16) {
        return false;
      }
    }
    return true
  }
}