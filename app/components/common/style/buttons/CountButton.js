import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Button from './Button';
import styles from './CountButton.style';

const { bool, func, number, oneOfType, string } = PropTypes;

const CountButton = ({
  alwaysShowCount,
  count,
  icon,
  isActive,
  onClickEvent,
  mod,
}) => (
  <div>
    <DeviceContext.Consumer>
      {context => (
        <div>
          {context.isDesktop || alwaysShowCount ? (
            <button
              className={cn('button-container', mod, { active: isActive })}
              onClick={onClickEvent}
            >
              <img className="button-icon" src={icon} />
              <span
                className="text"
                dangerouslySetInnerHTML={{ __html: count }}
              />
            </button>
          ) : (
            <Button
              isActive={isActive}
              onClickEvent={onClickEvent}
              icon={icon}
              mod={mod}
            />
          )}
        </div>
      )}
    </DeviceContext.Consumer>
    <style jsx>{styles}</style>
  </div>
);

CountButton.propTypes = {
  alwaysShowCount: bool,
  isActive: bool,
  count: oneOfType([string, number]),
  icon: string.isRequired,
  onClickEvent: func.isRequired,
  mod: string,
};
CountButton.defaultProps = {
  alwaysShowCount: false,
  isActive: false,
};

export default CountButton;
