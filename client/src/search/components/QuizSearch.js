import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const QuizSearch = () => {
  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'tag'}
          size={'input-mid'}
          labelDesign={"mid"}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'number'} 
          label={'Difficulty level'}
          size={'input-mid'}
          labelDesign={"mid"}
        />
      </div>     
    </Fragment>
  )
}

export default QuizSearch
