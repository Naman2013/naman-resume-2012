import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CenterColumn from 'app/components/common/CenterColumn';
import GenericButton from 'app/components/common/style/buttons/Button';
import Medallion from 'app/components/common/TiaraTitleSection/Medallion';
import {
  white_tile_paper,
  golden,
  golda,
} from 'app/styles/variables/colors_tiles_v4';
import style from './title-section.style';
import _noop from 'lodash/noop';

const QuestDetailsTitleSection = ({
  iconURL,
  preTitle,
  showActionButton,
  actionButtonEvent,
  actionButtonCaption,
  title,
  showInProgressButton,
  inProgressButtonCaption,
}) => (
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
        <span className="pre-title">{preTitle}</span>
        {title}
      </h2>
      <div className="action-container">
        {showActionButton ? (
          <GenericButton
            text={actionButtonCaption}
            onClickEvent={actionButtonEvent}
          />
        ) : null}
        {showInProgressButton ? (
          <GenericButton text={inProgressButtonCaption} onClickEvent={_noop} />
        ) : null}
      </div>
    </CenterColumn>

    <style jsx>{style}</style>
  </div>
);

QuestDetailsTitleSection.defaultProps = {
  preTitle: '',
  iconURL: '',
};

QuestDetailsTitleSection.propTypes = {
  preTitle: PropTypes.string,
  iconURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  showActionButton: PropTypes.bool,
  actionButtonCaption: PropTypes.string,
  actionButtonEvent: PropTypes.func,
};

export default QuestDetailsTitleSection;
