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
}