import React, { Fragment } from 'react';
import PropTypes, { bool, shape } from 'prop-types';
import cn from 'classnames';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import style from './HubHeader.style';

const { string } = PropTypes;

const HubHeader = props => {
  const {
    title,
    icon,
    showIcon,
    renderNav,
    renderRightMenu,
    titleTheme,
    profile,
  } = props;

  return (
    <Fragment>
      <div className={cn('root', { profile })}>
        {showIcon && (
          <div className="hub-header-icon">
            <img src={icon} className="hub-icon" alt={title} />
          </div>
        )}
        <div className="hub-header-title-container">
          <div
            className="hub-header-title"
            style={titleTheme}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {renderRightMenu ? (
            <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
              <div className="right-menu-nav">{renderRightMenu()}</div>
            </DisplayAtBreakpoint>
          ) : null}
          {renderRightMenu ? (
            <DisplayAtBreakpoint screenSmall>
              <div className="right-menu-nav">{renderRightMenu()}</div>
            </DisplayAtBreakpoint>
          ) : null}
        </div>
        {renderNav ? <div className="hub-header-nav">{renderNav()}</div> : null}
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

HubHeader.propTypes = {
  title: string,
  icon: string,
  showIcon: bool,
  titleTheme: shape({}),
  profile: bool,
};

HubHeader.defaultProps = {
  title: '',
  icon: '',
  showIcon: true,
  titleTheme: {},
  profile: false,
};

export default HubHeader;
