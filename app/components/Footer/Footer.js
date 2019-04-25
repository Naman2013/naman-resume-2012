/***********************************
* V4 Footer
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import BootstrappedFooter from './BootstrappedFooter';
import { GET_FOOTER_NAVIGATION } from 'app/services/navigation';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


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
    render={({
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedFooter
          {...serviceResponse}
        />}
      </div>
    )}
  />
);


export default Footer;
