/***********************************
* V4 Quest Details
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CenterColumn from 'app/components/common/CenterColumn';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import GuideSection from 'app/components/guides/GuideSection';
import BodyContent from 'app/components/quest-details/body-content';
import ContentList from 'app/components/quest-details/content-list';
import QuestTitleSection from 'app/components/quest-details/title-section';
import QuestStepList from 'app/components/quest-details/step-list';
import { resources } from 'app/styles/variables/iconURLs';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import styles from './QuestDetails.style';

const {
  bool,
  func,
  number,
  shape,
  string,
  instanceOf,
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
  userActions: shape({
    stepQuest: func.isRequired,
    goToStep: func.isRequired,
  }).isRequired,
  modal: shape({
    modalComponent: instanceOf(Component),
    modalStyles: shape({}),
    showModal: bool,
  }),
};
QuestDetails.defaultProps = {
  pageMeta: {},
  modal: {},
};

export default QuestDetails;
