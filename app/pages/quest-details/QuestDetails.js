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
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import QuestTitleSection from 'components/quest-details/title-section';
import QuestStepList from 'components/quest-details/step-list';
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
    guideId: questId,
    content: () => (
      <GuideBodyContent
        title={pageMeta.aboutTitle}
        content={pageMeta.aboutText}
        topicActionProps={{}}
      />
    ),
    column: () => (
      <GuideContentList
        list={pageMeta.aboutBulletPoints}
        topicActionProps={{}}
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
        <QuestStepList />
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
}

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
