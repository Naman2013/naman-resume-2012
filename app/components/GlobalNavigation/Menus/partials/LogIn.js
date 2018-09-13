import React from 'react';
import PropTypes from 'prop-types';
import Login from 'redux/components/Login';
import MenuTitleBar from './MenuTitleBar';
import { romance } from 'styles/variables/colors_tiles_v4';


import {
  userAstronaut,
} from 'styles/variables/iconURLs';

const LogIn = ({
  avatarURL,
}) => (
  <div className="root">
    <MenuTitleBar
      title="Sign-in"
      iconURL={avatarURL || userAstronaut}
    />
    <Login />
    <style jsx>{`
      .root {
        width: 100%;
        background-color: ${romance};
      }

    `}</style>
  </div>
);

LogIn.propTypes = {

};

LogIn.defaultProps = {

}

export default LogIn;
