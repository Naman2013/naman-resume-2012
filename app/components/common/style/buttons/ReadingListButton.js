import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericButton from './Button';
import { DeviceContext } from 'providers/DeviceProvider';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const ReadingListButton = ({ icon, text, onClickEvent }) => (
  <Fragment>
    <GenericButton
      theme={{ height: '40px' }}
      onClickEvent={onClickEvent}
      text={text}
      icon={icon}
    />
  </Fragment>
);

ReadingListButton.propTypes = {
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func,
};
ReadingListButton.defaultProps = {
  text: null,
  string: null,
  onClickEvent: noop,
};

export default ReadingListButton;
