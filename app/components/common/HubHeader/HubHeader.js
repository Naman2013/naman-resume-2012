import React, { Fragment } from 'react';
import PropTypes, { bool, shape } from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import style from './HubHeader.style';

const { string } = PropTypes;

const HubHeader = ({
  title, icon, showIcon, renderNav, renderRightMenu, titleTheme,
}) => (
  <Fragment>
    <div className="root">
      {showIcon && (
        <div className="hub-header-icon">
          <img src={icon} className="hub-icon" />
        </div>
      )}
      <div className="hub-header-title-container">
        <div
          className="hub-header-title"
          style={titleTheme}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {renderRightMenu ? (
          <div className="right-menu-nav">
            <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
              {renderRightMenu()}
            </DisplayAtBreakpoint>
          </div>
        ) : null}
      </div>
      {renderNav ? <div className="hub-header-nav">{renderNav()}</div> : null}
      {renderRightMenu ? (
        <DisplayAtBreakpoint screenSmall>
          <div className="right-menu-nav">{renderRightMenu()}</div>
        </DisplayAtBreakpoint>
      ) : null}
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

HubHeader.propTypes = {
  title: string,
  icon: string,
  showIcon: bool,
  titleTheme: shape({}),
};

HubHeader.defaultProps = {
  title: '',
  icon: '',
  showIcon: true,
  titleTheme: {},
};

export default HubHeader;
