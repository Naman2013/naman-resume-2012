import React from 'react';
import PropTypes from 'prop-types';
import style from './GuideBodyContent.style';

const GuideBodyContent = ({ title, content }) => (
  <div className="root">
    <h4 className="title">{title}</h4>
    <p>{content}</p>
    <style jsx>{style}</style>
  </div>
);

GuideBodyContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

GuideBodyContent.defaultProps = {
  title: '',
  content: '',
};

export default GuideBodyContent;
