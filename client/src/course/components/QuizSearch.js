import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const QuizSearch = props => {
  const { form, setForm } = props;

  const onChange = e => {
    setForm({...form, [e.target.id]: e.target.value});
  }

  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          id={'tags'}
          value={form.tags}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'tag'}
          size={'input-small'}
          labelDesign={"mid"}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'difficultyLevel'}
          value={form.difficultyLevel}
          onChange={onChange}
          element={'input'}
          type={'number'} 
          label={'Difficulty level'}
          size={'input-small'}
          labelDesign={"mid"}
          minValue={'1'}
          maxValue={'10'}
        />
      </div>     
    </Fragment>
  )
}

export default QuizSearch
