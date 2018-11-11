/***********************************
* V4 Quest Details
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CenterColumn from 'components/common/CenterColumn';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import GuideSection from 'components/guides/GuideSection';
import BodyContent from 'components/quest-details/body-content';
import ContentList from 'components/quest-details/content-list';
import QuestTitleSection from 'components/quest-details/title-section';
import QuestStepList from 'components/quest-details/step-list';
import { resources } from 'styles/variables/iconURLs';
import { romance } from 'styles/variables/colors_tiles_v4';
import styles from './QuestDetails.style';

const {
  func,
  number,
  shape,
  string,
} = PropTypes;


export const QuestDetails = (props) => {
  const {
    actions,
    modal,
    pageMeta,
    questId,
    userActions,
  } = props;
  const resourcesProps = {
    resourcesIconUrl: resources,
    resourcesButtonText: pageMeta.resourcesButtonCaption,
    questId,
    moduleId: pageMeta.resourcesModuleId,
  };

  const questSectionProps = {
    questId,
    content: () => (
      <BodyContent
        title={pageMeta.aboutTitle}
        content={pageMeta.aboutText}
        showResources={pageMeta.showResources}
        resourcesProps={resourcesProps}
      />
    ),
    column: () => (
      <ContentList
        list={pageMeta.aboutBulletPoints}
        showResources={pageMeta.showResources}
        resourcesProps={resourcesProps}
      />
    ),
    alignContent: 'right',
  };

  return (
    <div className="root">
      <Modal
        ariaHideApp={false}
        isOpen={modal.showModal}
        style={modal.modalStyles}
        contentLabel="quests details"
        onRequestClose={actions.closeModal}
      >
        {modal.modalComponent}
      </Modal>
      <QuestTitleSection
        preTitle={pageMeta.questSubtitle}
        title={pageMeta.questTitle}
        iconURL={pageMeta.iconURL}
        showActionButton={pageMeta.showStartQuestButton}
        actionButtonCaption={pageMeta.startQuestButtonCaption}
        actionButtonEvent={userActions.setupQuest}
      />
      <CenterColumn>
        <GuideSection
          theme={{ backgroundColor: romance }}
          {...questSectionProps}
        />
        <SterlingTitle
          title={pageMeta.stepsHeader}
          subTitle={pageMeta.stepsSubheader}
        />
        <QuestStepList
          list={pageMeta.stepList}
          goToStep={userActions.goToStep}
        />
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

QuestDetails.propTypes = {
  actions: shape({
    fetchQuestPageMeta: func.isRequired,
  }).isRequired,
  pageMeta: shape({
    iconURL: string.isRequired,
    questId: number.isRequired,
    questSubtitle: string.isRequired,
    questTitle: string.isRequired,
  }),
  questId: string.isRequired,
}
QuestDetails.defaultProps = {
  pageMeta: {},
}

export default QuestDetails;
