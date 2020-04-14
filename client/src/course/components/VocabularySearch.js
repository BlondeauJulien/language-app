import React, { Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';

const VocabularySearch = () => {
  return (
    <Fragment>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'word'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'translate to'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'difficulty level'}
          size={'input-small'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
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
