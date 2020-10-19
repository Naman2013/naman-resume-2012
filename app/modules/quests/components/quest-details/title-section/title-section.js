import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router';
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
  onDownloadPDF,
  questPdfUrl
}) => {
  const { 
    iconURL,
    questType,
    showStartQuestButton,
    startQuestButtonCaption,
    questTitle,
    showInProgressButton,
    inProgressButtonCaption,
    questReportPDFDownloadLabel,
    showQuestReportPDFDownloadFlag,
    aboutDownloadPDFURL,
    completed,
    showQuestCompletionIcons,
    questCompletionIcons = {},
  } = questData;
  const { 
    showQuestCompleteCheckIcon,
    questCompleteCheckIconUrl,
    showQuestCompleteCheckIconTooltip,
    questCompleteCheckIconTooltipText,
    questCompleteCheckIconLinkUrl,
    showQuestCompleteDownloadIcon,
    questCompleteDownloadIconUrl,
    showQuestCompleteDownloadIconTooltip,
    questCompleteDownloadIconTooltipText,
    questCompleteDownloadPDFUrl,
    showQuestCompleteBadgeIcon,
    questCompleteBadgeIconUrl,
    showQuestCompleteBadgeIconTooltip,
    questCompleteBadgeIconTooltipText,
    questCompleteBadgeIconLinkUrl,
  } = questCompletionIcons;

  const buttonStyle = {
    margin:5,
    padding:10

  }
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
        {/* <div className="blue-shield" /> */}
        <div className="icon-container">
          <img
            className="icon-content"
            alt=""
            width="100"
            height="100"
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
          <GenericButton style={buttonStyle} text={inProgressButtonCaption} onClickEvent={_noop} />
        ) : null}


        { showQuestReportPDFDownloadFlag ? (

          <Button style = {buttonStyle}><a onClick={() => onDownloadPDF(questPdfUrl)}>{questReportPDFDownloadLabel}
          <img src="https://img.icons8.com/metro/15/000000/downloading-updates.png"/>
          </a></Button>

        ) : null }

        {showQuestCompletionIcons && (
          <>
            {showQuestCompleteCheckIcon && (
              <Tooltip disabled={!showQuestCompleteCheckIconTooltip} theme="light" title={questCompleteCheckIconTooltipText} position="top">
                <Link to={questCompleteCheckIconLinkUrl}>
                  <CompleteCheckbox completed={showQuestCompleteCheckIcon} iconUrl={questCompleteCheckIconUrl} />
                </Link>
              </Tooltip>
            )}

            {showQuestCompleteDownloadIcon && (
              <Tooltip disabled={!showQuestCompleteDownloadIconTooltip} theme="light" title={questCompleteDownloadIconTooltipText} position="top">
                <Button onClick={() => onDownloadPDF(questCompleteDownloadPDFUrl)} className="quest-download-pdf-btn">
                  <img src={questCompleteDownloadIconUrl} alt="" />
                </Button>
              </Tooltip>
            )}

            {showQuestCompleteBadgeIcon && (
              <Tooltip disabled={!showQuestCompleteBadgeIconTooltip} theme="light" title={questCompleteBadgeIconTooltipText} position="top">
                <Link to={questCompleteBadgeIconLinkUrl}>
                  <Button onClick={() => {}} className="quest-download-pdf-btn">
                    <img src={questCompleteBadgeIconUrl} alt="" />
                  </Button>
                </Link>
              </Tooltip>
            )}
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
