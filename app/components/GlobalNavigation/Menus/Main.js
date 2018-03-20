import React from 'react';
import uniqueId from 'lodash/uniqueId';
import MenuList from './partials/MenuList';
import PrimaryButton from './partials/buttons/PrimaryButton';

import MAIN_CONFIGURATION from './mainConfiguration';

const Main = () => (
  <div>
    <MenuList items={MAIN_CONFIGURATION.primary} />
    <MenuList items={MAIN_CONFIGURATION.secondary} />
  </div>
);

export default Main;
