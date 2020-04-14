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
          size={'input-small'}
          labelDesign={"mid"}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'number'} 
          label={'Difficulty level'}
          size={'input-small'}
          labelDesign={"mid"}
        />
      </div>     
    </Fragment>
  )
}

export default QuizSearch
