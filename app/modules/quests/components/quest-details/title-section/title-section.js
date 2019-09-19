import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CenterColumn from 'app/components/common/CenterColumn';
import GenericButton from 'app/components/common/style/buttons/Button';
import Medallion from 'app/components/common/TiaraTitleSection/Medallion';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import {
  white_tile_paper,
  golden,
  golda,
} from 'app/styles/variables/colors_tiles_v4';
import style from './title-section.style';
import _noop from 'lodash/noop';
import { Button } from 'react-bootstrap';

const QuestDetailsTitleSection = ({
  questData,
  actionButtonEvent,
}) => {
  const { 
    iconURL,
    questType,
    showStartQuestButton,
    startQuestButtonCaption,
    questTitle,
    showInProgressButton,
    inProgressButtonCaption,
    completed,
    showQuestCompletionIcons,
    showQuestCompleteCheckIcon,
    showQuestCompleteCheckIconTooltip,
    questCompleteCheckIconTooltipText,
  } = questData;

  return (
  <div className="root">
    <CenterColumn
      theme={{
        background: `url(${white_tile_paper})`,
        position: 'relative',
        zIndex: '10',
        boxShadow: 'rgb(191, 191, 191) 0px 11px 20px -10px',
        padding: '70px 0',
      }}
    >
      <div className="shield-container">
        <div className="blue-shield" />
        <div className="icon-container">
          <img
            className="icon-content"
            alt=""
            width="40"
            height="40"
            src={iconURL}
          />
        </div>
      </div>

      <h2 className="title">
        <span className="pre-title">{questType}</span>
        {questTitle}
      </h2>
      <div className="action-container">
        {showStartQuestButton && !completed ? (
          <GenericButton
            text={startQuestButtonCaption}
            onClickEvent={actionButtonEvent}
          />
        ) : null}

        {showInProgressButton && !completed ? (
          <GenericButton text={inProgressButtonCaption} onClickEvent={_noop} />
        ) : null}

        {showQuestCompletionIcons && (
          <>
            {showQuestCompleteCheckIcon && (
              <Tooltip disabled={!showQuestCompleteCheckIconTooltip} theme="light" title={questCompleteCheckIconTooltipText} position="top">
                <CompleteCheckbox completed={!completed} />
              </Tooltip>
            )}

            <Button onClick={() => {}} className="quest-download-pdf-btn">
              <span className="icon-download" />
            </Button>

            <Button onClick={() => {}} className="quest-download-pdf-btn">
              <img src="https://vega.slooh.com/assets/v4/icons/shield_icon.svg" />
            </Button>
          </>
        )}
      </div>
    </CenterColumn>

    <style jsx>{style}</style>
  </div>
  );
};

QuestDetailsTitleSection.defaultProps = {
  questType: '',
  iconURL: '',
};

QuestDetailsTitleSection.propTypes = {
  questType: PropTypes.string,
  iconURL: PropTypes.string,
  questTitle: PropTypes.string.isRequired,
  showStartQuestButton: PropTypes.bool,
  startQuestButtonCaption: PropTypes.string,
  actionButtonEvent: PropTypes.func,
};

export default QuestDetailsTitleSection;
