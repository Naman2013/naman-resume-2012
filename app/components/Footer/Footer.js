/***********************************
* V4 Common Discussions Board Comments
*
* we call for all replies and paginate on the front end.
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedFooter from './BootstrappedFooter';
import { GET_FOOTER_NAVIGATION } from 'services/navigation';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MOCK_RESPONSE = {
  copyrightText: '2018 Slooh LLC. All rights reserved',
  primaryLinks: {
    primaryLink1: {
      'name': 'Sitemap',
      'link': '/sitemap',
    },
    primaryLink2: {
      'name': 'Terms',
      'link': '/help/terms-and-conditions',
    },
    primaryLink3: {
      'name': 'Privacy',
      'link': '/help/privacy',
    },
    primaryLink4: {
      'name': 'Patent',
      'link': '/patent',
    },
  },
}

const footerModel = {
  name: 'FOOTER_MENU',
  model: resp => ({
    ...MOCK_RESPONSE,
    primaryLinks: Object.values(MOCK_RESPONSE.primaryLinks),
  }),
};

const Footer = () => (
  <Request
    serviceURL={GET_FOOTER_NAVIGATION}
    method="POST"
    serviceExpiresFieldName="expires"
    model={footerModel}
    render={({
      modeledResponses: { FOOTER_MENU },
    }) => (
      <div>
        {<BootstrappedFooter
          {...FOOTER_MENU}
        />}
      </div>
    )}
  />
);


export default Footer;
