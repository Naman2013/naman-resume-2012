import React from 'react';
import PropTypes from 'prop-types';
import style from './description-container.style';

const DescriptionContainer = ({ mainTitle, title, content, footer, theme }) => (
  <div className="root" style={theme}>
    {mainTitle ? <div className="big-title">{mainTitle}</div> : null }
    <h4 className="title">{title}</h4>
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
    {footer ? footer() : null}
    <style jsx>{style}</style>
  </div>
);

DescriptionContainer.propTypes = {
  mainTitle: PropTypes.string,
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
};

DescriptionContainer.defaultProps = {
  mainTitle: null,
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default DescriptionContainer;
