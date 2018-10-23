import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './SectionTitle.style';

const ObjectDetailsSectionTitle = ( { title, subTitle, theme } ) => (
  <div className="title-bg" style={theme}>
    {title}
    <h1>{subTitle}</h1>
  <style jsx>{style}</style>
  </div>
);

ObjectDetailsSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  theme: PropTypes.shape({}),
};

ObjectDetailsSectionTitle.defaultProps = {
  subTitle: '',
  theme: {},
};

export default ObjectDetailsSectionTitle;
