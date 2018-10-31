/***********************************
* V4 Quest Details
*
*
*
***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import GuideSection from 'components/guides/GuideSection';
import BodyContent from 'components/quest-details/body-content';
import ContentList from 'components/quest-details/content-list';
import QuestTitleSection from 'components/quest-details/title-section';
import QuestStepList from 'components/quest-details/step-list';
import { resources } from 'styles/variables/iconURLs';
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
    questId,
    pageMeta,
  } = props;

  const guideSectionProps = {
    questId,
    content: () => (
      <BodyContent
        title={pageMeta.aboutTitle}
        content={pageMeta.aboutText}
        resourcesProps={{
          resourcesIconUrl: resources,
          resourcesButtonText: pageMeta.resourcesButtonCaption,
        }}
      />
    ),
    column: () => (
      <ContentList
        list={pageMeta.aboutBulletPoints}
        resourcesProps={{
          resourcesIconUrl: resources,
          resourcesButtonText: pageMeta.resourcesButtonCaption,
        }}
      />
    ),
    alignContent: 'right',
  };

  return (
    <div className="root">
      <QuestTitleSection
        preTitle={pageMeta.questSubtitle}
        title={pageMeta.questTitle}
        iconURL={pageMeta.iconURL}
        showActionButton={pageMeta.showStartQuestButton}
        actionButtonCaption={pageMeta.startQuestButtonCaption}
        actionButtonEvent={actions.startQuest}
      />
      <CenterColumn>
        <GuideSection
          {...guideSectionProps}
        />
        <SterlingTitle
          title={pageMeta.stepsHeader}
          subTitle={pageMeta.stepsSubheader}
        />
        <QuestStepList list={pageMeta.stepList} />
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
