import React from 'react';
import PropTypes from 'prop-types';
import ContextMenu from 'components/common/ContextMenu';
import BackArrow from 'components/common/icons/BackArrow';
import style from './InAppNavigation.style';
import { horizontalArrow } from 'styles/variables/iconURLs';

const InAppNavigation = ({ previousText, title }) => (
  <div className="root">
    <div className="mobile-back-text-container">
      <img className="icon-arrow" alt="" src={horizontalArrow} />
      <p className="back-text">back{previousText && ` to ${previousText}`}</p>
    </div>

    <div className="core-navigation-container">
      <button className="back-arrow"><BackArrow /></button>
      <h5 className="title">{title}</h5>
      <div className="context-menu-container">
        <ContextMenu />
      </div>
    </div>

    <style jsx>{style}</style>
  </div>
);

InAppNavigation.propTypes = {
  previousText: PropTypes.string,
  title: PropTypes.string.isRequired,
};

InAppNavigation.defaultProps = {
  previousText: '',
};

export default InAppNavigation;
