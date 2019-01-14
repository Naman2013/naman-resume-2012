import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './PageHeader.style';

const { string } = PropTypes;

const PageHeader = ({ title, icon }) => (
  <Fragment>
    <div className="root">
      <div className="header-title">{title}</div>
      <div className="header-icon-container">
        <img src={icon} alt="" className="header-icon" />
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

PageHeader.propTypes = {
  title: string.isRequired,
  icon: string.isRequired,
};

export default PageHeader;
