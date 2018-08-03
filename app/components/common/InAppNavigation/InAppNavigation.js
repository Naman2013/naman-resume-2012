import React from 'react';
import PropTypes from 'prop-types';
import ContextMenu from 'components/common/ContextMenu';
import BackArrow from 'atoms/icons/BackArrow';
import style from './InAppNavigation.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const InAppNavigation = ({
  previousText,
  title,
  contextMenuTitle,
  contextMenuCount,
  list,
  isOpen,
  menuTopAdjustment,
}) => (
  <div className="root">
    <div className="mobile-back-text-container">
      <img className="icon-arrow" alt="" src={horizontalArrow} />
      <p className="back-text">back{previousText && ` to ${previousText}`}</p>
    </div>

    <div className="core-navigation-container">
      <button className="back-arrow"><BackArrow /></button>
      <h5 className="title">{title}</h5>
      <div className="context-menu-container">
        <ContextMenu
          title={contextMenuTitle}
          count={contextMenuCount}
          list={list}
          isOpen={isOpen}
          menuTopAdjustment={menuTopAdjustment}
        />
      </div>
    </div>

    <style jsx>{style}</style>
  </div>
);

InAppNavigation.propTypes = {
  previousText: PropTypes.string,
  title: PropTypes.string.isRequired,
  contextMenuTitle: PropTypes.string.isRequired,
  contextMenuCount: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    linkURL: PropTypes.string,
  })).isRequired,
  isOpen: PropTypes.bool,
  menuTopAdjustment: PropTypes.number,
};

InAppNavigation.defaultProps = {
  previousText: '',
  isOpen: false,
  menuTopAdjustment: 98,
  contextMenuCount: 0,
};

export default InAppNavigation;
