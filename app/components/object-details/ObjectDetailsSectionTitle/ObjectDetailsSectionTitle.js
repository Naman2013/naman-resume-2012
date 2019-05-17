import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './SectionTitle.style';

const ObjectDetailsSectionTitle = ({ title, subTitle, theme, renderNav }) => (
  <div className="title-bg" style={theme}>
    {title}
    <h1>{subTitle}</h1>
    {renderNav ? renderNav() : null}
    <style jsx>{style}</style>
  </div>
);

ObjectDetailsSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  theme: PropTypes.shape({}),
  renderNav: PropTypes.func,
};

ObjectDetailsSectionTitle.defaultProps = {
  subTitle: '',
  theme: {},
  renderNav: null,
};

export default ObjectDetailsSectionTitle;
