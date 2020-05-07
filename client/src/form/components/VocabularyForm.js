import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import DualInput from './DualInput';
import InputForMulti from './InputForMulti';
import Button from '../../shared/components/FormElements/Button';
import TagsInput from './TagsInput'
import CourseContext from '../../context/course/courseContext';

import './VocabularyForm.css';

const VocabularyForm = () => {
	const courseContext = useContext(CourseContext);
	const history = useHistory();

	const { currentCourse } = courseContext

	const onClickBackCoure = () => {
		history.push('/course');
	}

	if(!currentCourse) {
		history.push('/');
		return null
	}

	return (
		<form>
			<h2 className="main-form__title">Add a word for: {currentCourse.name}</h2>
			<div className="main-form__input-container">
				<Input element={'input'} type={'text'} label={'Word'} placeholder={''} size={'input-full'} />
			</div>
			<div className="main-form__input-container translations-container">
				<h3>Translations:</h3>
				<InputForMulti label={'Translation 1'} />
				<InputForMulti label={'Translation 2'} />
				<InputForMulti label={'Translation 3'} />
				<Button type="button" size={'button-mid'} design={'green'}>
					<i className="fas fa-plus" /> Add a translation
				</Button>
			</div>
			<div className="main-form__input-container phrases-container">
				<h3>Add phrases including the {'word'}:</h3>
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
				<Button type="button" size={'button-mid'} design={'green'}>
					<i className="fas fa-plus" /> Add a phrase
				</Button>
			</div>
      <div className="main-form__input-container">
				<Input element={'input'} type={'text'} label={'Conjugation/Grammar link'} placeholder={'Add a link to conjugation or grammar rule...'} size={'input-full'} />
			</div>
      <div className="main-form__input-container">
				<Input label={'Note'} placeholder={'Add a note about this word'} size={'input-full'} />
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
				<Button onClick={onClickBackCoure}>Back to course</Button>
        <Button design={'green'} >Create</Button>
      </div>
		</form>
	);
};

export default VocabularyForm;
