import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';

const TitleButton = ({ text, linkURL }) => (
  <GenericButton
    text={text}
    icon={horizontalArrow}
    onClickEvent={() => { window.location = linkURL; }}
  />
);

TitleButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default TitleButton;
