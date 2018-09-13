/***********************************
* V4 Global Navigation
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedGlobalNavigation from './BootstrappedGlobalNavigation';
import { GET_MAIN_NAVIGATION } from 'services/navigation';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MOCK_RESPONSE = {
    userInfo: {
        displayName: 'Tara Lerias Bird',
        userLinks: {
          userLink1: {
            'name': 'My Photo Hub',
            'link': '/my-pictures',
          },
          userLink2: {
            'name': 'My Lists',
            'link': '/lists/my-lists',
          },
          userLink3: {
            'name': 'My Q&A',
            'link': '/qa/my-qa',
          },
          userLink4: {
            'name': 'My Quests',
            'link': '/quests/my-quests',
          },
          userLink5: {
            'name': 'My Groups',
            'link': '/community-groups/my-groups',
          },
          userLink6: {
            'name': 'Account Control',
            'link': '/account-settings',
          },
          userLink7: {
            'name': 'Upgrade Membership',
            'link': '/upgrade',
          },
        }
    },
}

const userMenuModel = {
  name: 'USER_MENU',
  model: resp => ({
    userInfo: MOCK_RESPONSE.userInfo,
    userLinks: Object.values(MOCK_RESPONSE.userInfo.userLinks),
  }),
};


const GlobalNavigation = () => (
  <Request
    serviceURL={GET_MAIN_NAVIGATION}
    method="POST"
    serviceExpiresFieldName="expires"
    models={[userMenuModel]}
    render={({
      fetchingContent,
      serviceResponse,
      modeledResponses: { USER_MENU },
    }) => (
      <div>
        {<BootstrappedGlobalNavigation
          userMenu={USER_MENU}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);


export default GlobalNavigation;
