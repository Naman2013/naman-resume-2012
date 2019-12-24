/***********************************
 * V4 Recommended Quests Slider
 *
 *
 *
 ***********************************/
import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import SloohSlider from '../Slider';
import DisplayAtBreakpoint from '../DisplayAtBreakpoint';
import { getSliderProps } from './recommendedQuestsSliderConfiguration';
import { QuestListItem } from './quest-list-item';

const RecommendedObjects = ({
  recommendedQuestsList = [],
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const sliderProps = getSliderProps(recommendedQuestsList, t, readOnly);
  const shortList = take(recommendedQuestsList, 2) || [];
  return (
    <div className="root">
      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <SloohSlider {...sliderProps} />
      </DisplayAtBreakpoint>
      <DisplayAtBreakpoint screenSmall>
        {shortList.map(quest => (
          <QuestListItem key={quest.linkUrl} {...quest} readOnly={readOnly} />
        ))}
      </DisplayAtBreakpoint>
      <style jsx>{`
        .root {
          margin: 0 auto;
          max-width: 644px;
        }
        @media only screen and (min-width: 1200px) {
          .root {
            max-width: 965px;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendedObjects;
