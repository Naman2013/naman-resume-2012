/***********************************
 * V4 Footer
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import { GET_FOOTER_NAVIGATION } from 'app/services/navigation';
import BootstrappedFooter from './BootstrappedFooter';
import './styles.scss';

const { bool, number, oneOfType, shape, string } = PropTypes;

// const footerModel = {
//   name: 'FOOTER_MENU',
//   model: resp => ({
//     ...resp
//   }),
// };

const Footer = () => (
  <Request
    serviceURL={GET_FOOTER_NAVIGATION}
    method="POST"
    serviceExpiresFieldName="expires"
    // model={footerModel}
    render={({ serviceResponse }) => (
      <div className="app-footer">
        <BootstrappedFooter {...serviceResponse} />
      </div>
    )}
  />
);

export default Footer;
