import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './HubHeader.style';

const { string } = PropTypes;

const HubHeader = ({ title, icon, renderNav }) => (
  <Fragment>
    <div className="root">
      <div className="hub-header-icon"><img src={icon} className="hub-icon"/></div>
      <div className="hub-header-title" dangerouslySetInnerHTML={{ __html: title }} />
      {renderNav ?
        <div className="hub-header-nav">renderNav()</div> : null}
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

HubHeader.propTypes = {
  title: string,
  icon: string,
};

HubHeader.defaultProps = {
  title: '',
  icon: '',
};

export default HubHeader;
