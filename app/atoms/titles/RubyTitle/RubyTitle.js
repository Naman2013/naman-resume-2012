import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './RubyTitle.style';

const RubyTitle = ({ text }) => (
  <Fragment>
    <h3 className="title">{text}</h3>
    <style jsx>{style}</style>
  </Fragment>
);

RubyTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RubyTitle;
