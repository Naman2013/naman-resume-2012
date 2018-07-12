import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from '../../../providers/DeviceProvider';
import SectionTitle from './SectionTitle';

const ObjectDetailsSectionTitle = ( { list } ) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (!context.isMobile) {
            return ( <SectionTitle list={list} /> );
          }
        }
      }
    </DeviceContext.Consumer>
  </Fragment>
);

ObjectDetailsSectionTitle.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

ObjectDetailsSectionTitle.defaultProps = {
  list: [],
};

export default ObjectDetailsSectionTitle;
