import React from 'react';
import PropTypes from 'prop-types';
import style from './GuideBodyContent.style';

const GuideBodyContent = ({ title, content, theme }) => (
  <div className="root" style={theme}>
    <h4 className="title">{title}</h4>
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
    <style jsx>{style}</style>
  </div>
);

GuideBodyContent.propTypes = {
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
};

GuideBodyContent.defaultProps = {
  theme: {},
  title: '',
  content: '',
};

export default GuideBodyContent;
