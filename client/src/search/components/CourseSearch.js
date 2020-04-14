import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const CourseSearch = () => {
  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'course name'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'language'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'learn from'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'Created by'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>       
    </Fragment>
  )
}

export default CourseSearch
