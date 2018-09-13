import React, { Fragment } from 'react';
import uniqueId from 'lodash/uniqueId';
import Request from 'components/common/network/Request';
import { MAIN_NAVIGATION } from 'services/navigation';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import SocialMenu from './partials/SocialMenu';
import MAIN_CONFIGURATION from './mainConfiguration';
import {
  sloohLogoAstronaut,
} from 'styles/variables/iconURLs';

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
          <MenuTitleBar
            title="Slooh Menu"
            iconURL={sloohLogoAstronaut}
          />
          <MenuList items={MAIN_CONFIGURATION.primary} />
          <SocialMenu />
          <MenuList items={MAIN_CONFIGURATION.secondary} />
        </Fragment>
      )}
    />
  </div>
);

export default Main;
