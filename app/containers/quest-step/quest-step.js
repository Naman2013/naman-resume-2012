/** *********************************
* V4 Quest Step
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
import styles from './quest-step.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;


export const QuestStep = (props) => {
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
        <ModuleList moduleList={pageMeta.stepModuleList} questId={questId} />
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

QuestStep.propTypes = {
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
QuestStep.defaultProps = {
  actions: {
  },
}

export default QuestStep;
