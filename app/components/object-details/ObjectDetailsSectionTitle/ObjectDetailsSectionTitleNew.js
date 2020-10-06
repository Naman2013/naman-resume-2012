import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './SectionTitleNew.style';

const ObjectDetailsSectionTitleNew = ({ title, subTitle, theme, renderNav }) => (
  <div className="title-bg" style={theme}>
    <h1>{title}</h1>
    <h2 dangerouslySetInnerHTML={{__html: subTitle}}/>
    {renderNav ? renderNav() : null}
    <style jsx>{style}</style>
  </div>
);

ObjectDetailsSectionTitleNew.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  theme: PropTypes.shape({}),
  renderNav: PropTypes.func,
};

ObjectDetailsSectionTitleNew.defaultProps = {
  subTitle: '',
  theme: {},
  renderNav: null,
};

export default ObjectDetailsSectionTitleNew;
