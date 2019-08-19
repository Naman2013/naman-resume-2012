import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericButton from './LargeButtonWithRightIcon';
import { DeviceContext } from 'providers/DeviceProvider';

const { bool, func, number, oneOfType, string } = PropTypes;

const ToggleJoinGroupButton = ({ icon, text, onClickEvent, disabled }) => (
  <Fragment>
    <GenericButton
      theme={{ height: '40px' }}
      onClickEvent={onClickEvent}
      text={text}
      icon={icon}
      disabled={disabled}
    />
  </Fragment>
);

ToggleJoinGroupButton.propTypes = {
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func,
};
ToggleJoinGroupButton.defaultProps = {
  text: null,
  string: null,
  onClickEvent: noop,
};

export default ToggleJoinGroupButton;
