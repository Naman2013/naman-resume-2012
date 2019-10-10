/** *********************************
 * V4 [About Slooh] Navigation
 *  Wrapper for SubPageNavigation component
 ********************************** */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SubPageNavigation from '../common/sub-page-navigation';
import style from './Navigation.style';

const generateNavItems = list =>
  list.map(item => ({ title: item.name, link: item.link }));

const Navigation = ({ aboutSloohSectionsList, locationPath }) => (
  <Fragment>
    <div className="navigation-root">
      <SubPageNavigation
        items={generateNavItems(aboutSloohSectionsList)}
        locationPath={locationPath}
      />
      <style jsx>{style}</style>
    </div>
  </Fragment>
);

Navigation.defaultProps = {};

Navigation.propTypes = {
  aboutSloohSectionsList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navigation;
