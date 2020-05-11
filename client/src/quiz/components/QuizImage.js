import React, { Fragment, useState } from 'react';

import './QuizImage.css';
import Button from '../../shared/components/FormElements/Button';

const QuizImage = props => {
  const [userWantToSeeImage, setUserWantToSeeImage ] = useState(false);

  return (
    <div className="quiz-image-container">
      {
        props.quiz.imageIsApprouved || userWantToSeeImage || props.alwaysDisplayUnapprovedImage ? (
          <img src={props.quiz.image} alt="quiz image" />
        ) : (
          <Fragment>
            <p>The image had not been approved by a moderator yet.</p>
            <p>Do you want to see it anyway?</p>
            <div className="unaproved-image-actions-buttons">
              <Button type={'button'} onClick={() => setUserWantToSeeImage(true)}>I want to see the image</Button>
              <Button 
                type={'button'} 
                onClick={props.setAlwaysShowUnapprovedImage} 
                design={'plain-text-warning'}
              >
                Always show me unapproved image for this session.
              </Button>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

export default QuizImage
