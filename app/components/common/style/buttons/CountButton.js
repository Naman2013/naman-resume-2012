import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';
import { DeviceContext } from 'providers/DeviceProvider';
import styles from './CountButton.style';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const CountButton = ({
  alwaysShowCount,
  count,
  icon,
  isActive,
  onClickEvent,
}) => (
  <div>
    <DeviceContext.Consumer>
      {context => (<div>
        {context.isDesktop || alwaysShowCount ?
          <button
            className={classnames('button-container', { active: isActive })}
            onClick={onClickEvent}
          >
            <img
              className="button-icon"
              src={icon}
            />
            <span className="text" dangerouslySetInnerHTML={{ __html: count }} />
          </button> :
          <Button
            isActive={isActive}
            onClickEvent={onClickEvent}
            icon={icon}
          />
        }
      </div>)}
    </DeviceContext.Consumer>
    <style jsx>{styles}</style>
  </div>
);

CountButton.propTypes = {
  alwaysShowCount: bool,
  isActive: bool,
  count: oneOfType([string, number]).isRequired,
  icon: string.isRequired,
  onClickEvent: func.isRequired,
};
CountButton.defaultProps = {
  alwaysShowCount: false,
  isActive: false,
};

export default CountButton;
