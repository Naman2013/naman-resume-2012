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
import ModuleList from 'components/quests/module-list';
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
  } = props;
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
      <CenterColumn>
        <div className="inner-container">
          <div className="shield-container">
            <div className="blue-shield" />
            <div className="icon-container">
              <img className="icon-content" alt="" width="40" height="40" src={pageMeta.stepIconURL} />
            </div>
          </div>
          <ModuleList moduleList={pageMeta.stepModuleList} questId={questId} />
        </div>
      </CenterColumn>
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
}

export default QuestComplete;
