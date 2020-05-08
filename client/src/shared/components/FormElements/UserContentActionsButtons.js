import React from 'react';

import Button from './Button';

const UserContentActionsButtons = props => {
  const {textToDisplayOnCreateBtn, onCLickCreateContent, onClickEdit, onClickDelete} = props;
	return (
		<div className="user-course-actions-btn">
      {
        textToDisplayOnCreateBtn && (
          <Button design={'green'} size={'button-mid'} onClick={onCLickCreateContent}>
            <i className="fas fa-plus" /> {textToDisplayOnCreateBtn}
          </Button>
        )
      }
			<Button design={'orange'} size={'button-mid'} onClick={onClickEdit}>
				<i className="fas fa-edit" />
			</Button>
			<Button design={'danger'} size={'button-mid'} onClick={onClickDelete}>
				<i className="fas fa-trash-alt" />
			</Button>
		</div>
	);
};

export default UserContentActionsButtons;
