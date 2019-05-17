import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import GenericButton from 'app/components/common/style/buttons/Button';
import { horizontalArrow } from 'app/styles/variables/iconURLs';

const TitleButton = ({ text, linkURL }) => (
  <GenericButton
    text={text}
    icon={horizontalArrow}
    onClickEvent={() => {
      window.open(linkURL);
    }}
  />
);

TitleButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default TitleButton;
