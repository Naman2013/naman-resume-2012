import React, { Fragment } from 'react';
import uniqueId from 'lodash/uniqueId';
import Request from 'components/common/network/Request';
import { MAIN_NAVIGATION } from 'services/navigation';
import MenuList from './partials/MenuList';
import SocialMenu from './partials/SocialMenu';

import MAIN_CONFIGURATION from './mainConfiguration';


const Main = () => (
  <div>
    <Request
      serviceURL={MAIN_NAVIGATION}
      // model={{}}
      // requestBody={{}}
      render={({
        // fetchingContent,
        // serviceResponse,
        // modeledResponses: { SUBJECT_GUIDE_MODEL },
      }) => (
        <Fragment>
          <MenuList items={MAIN_CONFIGURATION.primary} />
          <SocialMenu />
          <MenuList items={MAIN_CONFIGURATION.secondary} />
        </Fragment>
      )}
    />
  </div>
);

export default Main;
