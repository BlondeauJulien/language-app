import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import DualInput from './DualInput';
import Button from '../../shared/components/FormElements/Button';
import TagsInput from './TagsInput'

import './VocabularyForm.css';

const VocabularyForm = () => {
	return (
		<form>
			<h2 className="main-form__title">Word</h2>
			<div className="main-form__input-container">
				<Input element={'input'} type={'text'} label={'Word'} placeholder={''} size={'input-full'} />
			</div>
			<div className="main-form__input-container translations-container">
				<h3>Translations:</h3>
				<div>
					<Input
						element={'input'}
						type={'text'}
						label={'Translation1'}
						placeholder={''}
						size={'input-full'}
					/>
				</div>
				<div>
					<Input
						element={'input'}
						type={'text'}
						label={'Translation2'}
						placeholder={''}
						size={'input-full'}
					/>
				</div>
				<div>
					<Input
						element={'input'}
						type={'text'}
						label={'Translation3'}
						placeholder={''}
						size={'input-full'}
					/>
				</div>
				<Button type="button">
					<i className="fas fa-plus" /> Add a translation
				</Button>
			</div>
			<div className="main-form__input-container phrases-container">
				<h3>Add phrases including {'word'}:</h3>
				<DualInput
					label1={'Phrase 1'}
					placeholder1={'Add a phrase...'}
					label2={'Translation for phrase 1'}
					placeholder2={'Add translation.'}
				/>
				<DualInput
					label1={'Phrase 2'}
					placeholder1={'Add a phrase...'}
					label2={'Translation for phrase 2'}
					placeholder2={'Add translation.'}
				/>
				<DualInput
					label1={'Phrase 3'}
					placeholder1={'Add a phrase...'}
					label2={'Translation for phrase 3'}
					placeholder2={'Add translation.'}
				/>
				<Button type="button">
					<i className="fas fa-plus" /> Add a phrase
				</Button>
			</div>
      <div className="main-form__input-container">
				<Input element={'input'} type={'text'} label={'Conjugation/Grammar link'} placeholder={'Add a link to conjugation or grammar rule...'} size={'input-full'} />
			</div>
      <div className="main-form__input-container">
				<Input label={'Conjugation/Grammar link'} placeholder={'Add a note about this word'} size={'input-full'} />
			</div>
      <div className="main-form__input-container">
        <Input
          element={'input'}
          type={'number'}
          label={'Difficulty level'}
          placeholder={'(1 to 10)'}
          size={'input-full'}
          minValue="1"
          maxValue="10"
        />
      </div>
      <TagsInput 
          containerClassName={'main-form__input-container'} 
          placeholder={'color, verb, family...'}
        />
      <div className="main-form__button-container">
        <Button>Create</Button>
      </div>
		</form>
	);
};

export default VocabularyForm;
