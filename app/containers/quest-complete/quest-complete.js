/** *********************************
* V4 Quest Complete Overview
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Modal from 'react-modal';
import CenterColumn from 'components/common/CenterColumn';
import styles from './quest-complete.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;


export const QuestComplete = (props) => {
  const {
    actions,
    modal,
    user,
    pageMeta,
    questId,
    complete,
  } = props;
  console.log(props)
  return (
    <div className="root">
      <Modal
        ariaHideApp={false}
        isOpen={modal.showModal}
        style={modal.modalStyles}
        contentLabel="quests"
        onRequestClose={actions.closeModal}
      >
        {modal.modalComponent}
      </Modal>
        <div className="inner-root-header" />

        <div className="inner-center">
          <CenterColumn>
            <div className="inner-center-intro">
              <span className="congrats" dangerouslySetInnerHTML={{ __html: complete.congratulationsCaption }} />
              <span className="quest-completed" dangerouslySetInnerHTML={{ __html: complete.questCompletedTitle }} />
            </div>
            <div className="inner-container">
              <div className="shield-container">
                <div className="blue-shield" />
                <div className="icon-container">
                  <img className="icon-content" alt="" width="40" height="40" src={complete.stepIconURL} />
                </div>
              </div>
              <div className="content-container">
                <div className="awarded">{complete.youAreAwardedCaption}</div>
                <div className="earned-in">{complete.earnedInCaption}</div>
                <div className="step-list">
                    {complete.stepList.map(step => (<div className="step">
                    <div>{step.stepFullTitle}</div>
                    <img className="check-icon" src={step.stepIconURL} alt="incompleted icon" />
                  </div>))}
                </div>
              </div>
            </div>
          </CenterColumn>
        </div>
      <style jsx>{styles}</style>
    </div>
  );
};

QuestComplete.propTypes = {
  actions: shape({
  }),
  user: shape({
    at: string.isRequired,
    token: string.isRequired,
    cid: string.isRequired,
  }).isRequired,
  userActions: shape({
  }),

}
QuestComplete.defaultProps = {
  actions: {
  },
  complete: {
    stepList: [],
  }
}

export default QuestComplete;
