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
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'translate to'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'difficulty level'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>
      <div className="search-input-wrapper">
        <Input 
          element={'input'}
          type={'text'} 
          label={'tag'}
          size={'input-mid'}
          labelDesign={'mid'}
        />
      </div>       
    </Fragment>
  )
}

export default VocabularySearch
