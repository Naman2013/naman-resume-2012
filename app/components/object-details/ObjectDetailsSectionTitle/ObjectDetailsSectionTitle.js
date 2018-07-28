import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './SectionTitle.style';

const ObjectDetailsSectionTitle = ( { title, subTitle } ) => (
  <div className="title-bg">
    {title}
    <h1>{subTitle}</h1>
  <style jsx>{style}</style>
  </div>
);

ObjectDetailsSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};

ObjectDetailsSectionTitle.defaultProps = {
  subTitle: '',
};

export default ObjectDetailsSectionTitle;
