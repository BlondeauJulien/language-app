import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const VocabularySearch = props => {
  const { form, setForm } = props;

  const onChange = e => {
    setForm({...form, [e.target.id]: e.target.value});
  }

  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          id={'word'}
          value={form.word}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'word'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'translation'}
          value={form.translation}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'translate to'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'difficultyLevel'}
          value={form.difficultyLevel}
          onChange={onChange}
          element={'input'}
          type={'number'} 
          label={'difficulty level'}
          size={'input-small'}
          labelDesign={'mid'}
          minValue={'1'}
          maxValue={'10'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          id={'tags'}
          value={form.tags}
          onChange={onChange}
          element={'input'}
          type={'text'} 
          label={'tag'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>       
    </Fragment>
  )
}

export default VocabularySearch
