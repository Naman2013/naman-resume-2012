import React, { Fragment } from 'react';
import noop from 'lodash/noop';
import GenericButton from '../../components/common/style/buttons/Button';
import style from './AskQuestionTile.style';

const AskQuestionTile = () => (
  <Fragment>
    <div className="ask-question-tile">
      <div className="ask-question-text">
        <span className="dek">Have a Question?</span>
        <h2>Ask an Astronomer!</h2>
        <p>Nam dapibus nisl vitae elitem fringilla rutrum. Aenean lener elementum rutrum.</p>
        <GenericButton onClickEvent={noop} text="SUBMIT A QUESTION"icon="https://vega.slooh.com/assets/v4/common/plus_icon.svg" />
      </div>
      <div className="icon-container">
        <div className="border">
          <div className="icon">
            <img className="icon-content" alt="" src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png" />
          </div>
        </div>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

export default AskQuestionTile;
