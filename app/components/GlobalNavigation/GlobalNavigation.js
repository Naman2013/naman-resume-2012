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
    mainMenu: {
      primaryLinks: {
        primaryLink1: {
          'name': 'Home',
          'link': '/',
        },
        primaryLink2: {
          'name': 'Telescopes',
          'link': '/telescopes',
        },
        primaryLink3: {
          'name': 'My Observations',
          'link': '/my-pictures',
        },
        primaryLink4: {
          'name': 'Guides',
          'link': '/guides',
        },
        primaryLink5: {
          'name': 'Groups',
          'link': '/community-groups/public',
        },
        primaryLink6: {
          'name': 'Quests',
          'link': '/quests',
        },
        primaryLink7: {
          'name': 'Shows',
          'link': '/shows',
        },
        primaryLink8: {
          'name': 'Stories',
          'link': '/stories',
        },
      },
      secondaryLinks: {
        secondaryLink1: {
          'name': 'About Slooh',
          'link': '/welcome',
        },
        secondaryLink2: {
          'name': 'Memberships',
          'link': '/telescopes',
        },
        secondaryLink3: {
          'name': 'Partner with Slooh',
          'link': '/my-pictures',
        },
        secondaryLink4: {
          'name': 'Slooh Careers',
          'link': '/guides',
        },
      }
    },
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

const mainMenuModel = {
  name: 'MAIN_MENU',
  model: resp => ({
    primaryLinks: Object.values(MOCK_RESPONSE.mainMenu.primaryLinks),
    secondaryLinks: Object.values(MOCK_RESPONSE.mainMenu.secondaryLinks),
  }),
};


const GlobalNavigation = () => (
  <Request
    serviceURL={GET_MAIN_NAVIGATION}
    method="POST"
    serviceExpiresFieldName="expires"
    models={[
      userMenuModel,
      mainMenuModel,
    ]}
    render={({
      fetchingContent,
      // serviceResponse,
      modeledResponses: { USER_MENU, MAIN_MENU },
    }) => (
      <div>
        {<BootstrappedGlobalNavigation
          userMenu={USER_MENU}
          mainMenu={MAIN_MENU}
        />}
      </div>
    )}
  />
);


export default GlobalNavigation;
