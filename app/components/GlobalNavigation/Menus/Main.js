import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { useTranslation } from 'react-i18next';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import messages from './Main.messages';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import SocialMenu from './partials/SocialMenu';
import {
  PRIMARY_CONFIGURATION,
  SECONDARY_CONFIGURATION,
} from './mainConfiguration';

const Main = ({ mainMenu }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <MenuTitleBar title={t('.title')} iconURL={sloohLogoAstronaut} />
      <MenuList items={PRIMARY_CONFIGURATION(mainMenu.primaryLinks)} />
      <SocialMenu />
      <MenuList items={SECONDARY_CONFIGURATION(mainMenu.secondaryLinks)} />
    </Fragment>
  );
};

Main.propTypes = {
  mainMenu: PropTypes.shape({
    primaryLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
      })
    ),
    secondaryLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
      })
    ),
  }),
};

Main.defaultProps = {
  mainMenu: {
    primaryLinks: [],
    secondaryLinks: [],
  },
};

export default Main;
