import React from 'react';
import PropTypes from 'prop-types';
import style from './GuideBodyContent.style';

const GuideBodyContent = ({
  title,
  content,
  footer,
  theme,
}) => (
  <div className="root" style={theme}>
    <h4 className="title">{title}</h4>
    <span className="__html-content__" dangerouslySetInnerHTML={{ __html: content }} />
    {footer ? footer() : null}
    <style jsx>{style}</style>
  </div>
);

GuideBodyContent.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
};

GuideBodyContent.defaultProps = {
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default GuideBodyContent;
