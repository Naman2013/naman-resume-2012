import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { DeviceContext } from 'providers/DeviceProvider';
import GenericButton from './Button';

const { bool, func, number, oneOfType, string } = PropTypes;

const ReadingListButton = ({ icon, text, onClickEvent, theme }) => (
  <Fragment>
    <GenericButton
      theme={{ height: '40px', ...theme }}
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
