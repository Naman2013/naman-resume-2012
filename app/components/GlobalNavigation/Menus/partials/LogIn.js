import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FormattedMessage } from 'react-intl';
import Login from 'redux/components/Login';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import { userAstronaut } from 'app/styles/variables/iconURLs';
import MenuTitleBar from './MenuTitleBar';
import messages from './Login.messages';

const LogIn = ({ avatarURL }) => {
  const { t } = useTranslation();
  return (
    <div className="root">
      <MenuTitleBar title={t('.SignIn')} iconURL={avatarURL || userAstronaut} />
      <Login />
      <style jsx>
        {`
          .root {
            width: 100%;
            background-color: ${romance};
          }
        `}
      </style>
    </div>
  );
};

LogIn.propTypes = {};

LogIn.defaultProps = {};

export default LogIn;
