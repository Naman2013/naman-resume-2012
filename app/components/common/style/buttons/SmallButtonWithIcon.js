import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { DeviceContext } from 'providers/DeviceProvider';
import styles from './SmallButtonWithIcon.style';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const SmallButtonWithIcon = ({
  text,
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
            <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
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

SmallButtonWithIcon.propTypes = {
  text: oneOfType([string, number]).isRequired,
  icon: string.isRequired,
  onClickEvent: func.isRequired,
};
SmallButtonWithIcon.defaultProps = {};

export default SmallButtonWithIcon;
