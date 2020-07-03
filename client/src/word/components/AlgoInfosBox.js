import React from 'react';

import Button from '../../shared/components/FormElements/Button';

import './AlgoInfosBox.css';

const AlgoInfosBox = props => {
  const { setOpenInfoBox } = props;

  return (
    <div className="algo-infos-cont">
      <div className="algo-infos--text">
        <p>On clicking the next arrow or one of these picks you will move to the next word.</p>
        <p>So be sure you finish with this word before any action.</p>
        <br />
        <p>
          Clicking on how well you know the word will add it to a list with
          all the words of this pick.
        </p>
        <p>
          If you pick "BAD". Then you will see this word pop up more often during your reviews.
        </p>
        <p>
          One the oposite, if you pick "WELL" you will rarely see it.
        </p>
      </div>
      <Button design="green" size="button-mid" onClick={() => setOpenInfoBox(false)}>Got it!</Button>
    </div>
  )
}

export default AlgoInfosBox
