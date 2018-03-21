import React from 'react';
import uniqueId from 'lodash/uniqueId';
import MenuList from './partials/MenuList';
import SocialMenu from './partials/SocialMenu';
import PrimaryButton from './partials/buttons/PrimaryButton';

import MAIN_CONFIGURATION from './mainConfiguration';

const Main = () => (
  <div>
    <MenuList items={MAIN_CONFIGURATION.primary} />
    <SocialMenu />
    <MenuList items={MAIN_CONFIGURATION.secondary} />
  </div>
);

export default Main;
