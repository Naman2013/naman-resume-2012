import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { DeviceContext } from 'providers/DeviceProvider';
import styles from './CountButton.style';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const CountButton = ({
  count,
  icon,
  onClickEvent,
}) => (
  <div>
    <DeviceContext.Consumer>
      {context => (<div>
        {context.isDesktop ?
          <button
            className="button-container"
            onClick={onClickEvent}
          >
            <img
              src={icon}
            />
            <span className="text" dangerouslySetInnerHTML={{ __html: count }} />
          </button> :
          <Button
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
  count: oneOfType([string, number]).isRequired,
  icon: string.isRequired,
  onClickEvent: func.isRequired,
};
CountButton.defaultProps = {};

export default CountButton;
