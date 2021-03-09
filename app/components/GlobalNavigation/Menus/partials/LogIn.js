import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Login from 'redux/components/Login';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import { userAstronaut } from 'app/styles/variables/iconURLs';
import MenuTitleBar from './MenuTitleBar';

const LogIn = ({ avatarURL, loginMenuLinks, giftCardLinks  }) => { 
  const { t } = useTranslation();
  return (
    <div className="root">
      <MenuTitleBar
        title={t('Dashboard.SignIn')}
        iconURL={avatarURL || userAstronaut}
      />
      <Login 
        loginMenuLinks={loginMenuLinks}
        giftCardLinks={giftCardLinks}
      />
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
