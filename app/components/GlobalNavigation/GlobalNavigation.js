import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import Request from 'app/components/common/network/Request';
import { DeviceContext } from 'providers/DeviceProvider';
import BootstrappedGlobalNavigation from './BootstrappedGlobalNavigation';
import { GET_MAIN_NAVIGATION } from 'app/services/navigation';
import { storeTopNavResponse } from 'app/modules/new-dashboard/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

const { bool, number, oneOfType, shape, string } = PropTypes;

const userMenuModel = {
  name: 'USER_MENU',
  model: resp => ({
    userInfo: has(resp, 'mainMenu.userInfo') ? resp.mainMenu.userInfo : {},
    userLinks: has(resp, 'mainMenu.userInfo.userLinks')
      ? resp.mainMenu.userInfo.userLinks
      : [],
  }),
};

const mainMenuModel = {
  name: 'MAIN_MENU',
  model: resp => ({
    primaryLinks: has(resp, 'mainMenu.primaryLinks')
      ? resp.mainMenu.primaryLinks
      : [],
    secondaryLinks: has(resp, 'mainMenu.secondaryLinks')
      ? resp.mainMenu.secondaryLinks
      : [],
    loginMenuLinks: has(resp, 'mainMenu.loginMenuLinks')
      ? resp.mainMenu.loginMenuLinks
      : [],
    giftCardLinks: has(resp, 'mainMenu.getDynamicAdsLinks')
      ? resp.mainMenu.getDynamicAdsLinks
      : [],
  }),
};

const GlobalNavigation = ({fetchEvents, storeTopNavResponse}) => (
  <Request
    serviceURL={GET_MAIN_NAVIGATION}
    method="POST"
    serviceExpiresFieldName="expires"
    models={[userMenuModel, mainMenuModel]}
    serviceResponseHandler={(res)=> storeTopNavResponse(res)}
    render={({
      fetchingContent,
      // serviceResponse,
      modeledResponses: { USER_MENU, MAIN_MENU },
    }) => (
      <div>
        <DeviceContext.Consumer>
          {context => (
            <BootstrappedGlobalNavigation
              userMenu={USER_MENU}
              mainMenu={MAIN_MENU}
              isMobile={context.isMobile}
              fetchEvents={fetchEvents}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    )}
  />
);

export default compose(connect(null, {storeTopNavResponse} )) (GlobalNavigation);
