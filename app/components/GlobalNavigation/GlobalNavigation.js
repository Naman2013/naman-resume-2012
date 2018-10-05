import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
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


const userMenuModel = {
  name: 'USER_MENU',
  model: resp => ({
    userLinks: has(resp, 'mainMenu.userInfo.userLinks') ? resp.mainMenu.userInfo.userLinks : [],
  }),
};

const mainMenuModel = {
  name: 'MAIN_MENU',
  model: resp => ({
    primaryLinks: has(resp, 'mainMenu.primaryLinks') ? resp.mainMenu.primaryLinks : [],
    secondaryLinks: has(resp, 'mainMenu.secondaryLinks') ? resp.mainMenu.secondaryLinks : [],
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
