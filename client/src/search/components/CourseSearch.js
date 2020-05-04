import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const CourseSearch = props => {
  const { form, setForm} = props;

  const onChange = e => {
    setForm({...form, [e.target.id]: e.target.value});
  }

  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          id={'name'}
          value={form.name}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'course name'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'language'}
          value={form.language}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'language'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'learningFrom'}
          value={form.learningFrom}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'learn from'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'username'}
          value={form.username}
          onChange={onChange}
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
