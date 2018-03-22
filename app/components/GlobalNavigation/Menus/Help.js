import React from 'react';
import MenuList from './partials/MenuList';
import HELP_CONFIGURATION from './helpConfiguration';

const Help = () => (
  <div>
    <MenuList items={HELP_CONFIGURATION} />
  </div>
);

export default Help;
