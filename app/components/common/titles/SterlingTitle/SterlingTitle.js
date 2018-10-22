import React from 'react';
import PropTypes from 'prop-types';
import style from './SterlingTitle.style';

const SterlingTitle = ({ title, subTitle, theme }) => (
  <div className="root">
    <h4 style={theme.title} className="title">{title}</h4>
    {
      subTitle &&
        <p style={theme.subTitle} className="sub-title">{subTitle}</p>
    }
    <style jsx>{style}</style>
  </div>
);

SterlingTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  theme: PropTypes.shape({
    title: PropTypes.shape({}),
    subTitle: PropTypes.shape({}),
  }),
};

SterlingTitle.defaultProps = {
  subTitle: '',
  theme: { title: {}, subTitle: {} },
};

export default SterlingTitle;
