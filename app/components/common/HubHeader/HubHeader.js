import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './HubHeader.style';

const { string } = PropTypes;

const HubHeader = ({ title, icon, renderNav, renderRightMenu }) => (
  <Fragment>
    <div className="root">
      <div className="hub-header-icon"><img src={icon} className="hub-icon"/></div>
      <div className="hub-header-title-container">
        <div className="hub-header-title" dangerouslySetInnerHTML={{ __html: title }} />
        { renderRightMenu ? <div className="right-menu-nav">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            {renderRightMenu()}
          </DisplayAtBreakpoint>
        </div> : null }
      </div>
      {renderNav ?
        <div className="hub-header-nav">{renderNav()}</div> : null}
      <DisplayAtBreakpoint
        screenSmall
      >
        {renderRightMenu ? <div className="right-menu-nav">{renderRightMenu()}</div> : null}
      </DisplayAtBreakpoint>
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
