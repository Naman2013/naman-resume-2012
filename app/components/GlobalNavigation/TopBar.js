import React from 'react';
import Button from './Button';
import CenterBar from './CenterBar';
import MENU_INTERFACE from './Menus/MenuInterface';
import Notifications from './Menus/Notifications';
import ConnectUser from 'redux/components/ConnectUser';
import AlertsIcon from 'redux/components/AlertsIcon';
import {
  sloohLogoAstronaut,
  threeLinesAstronaut,
  telescopeAstronaut,
  searchAstronaut,
  userAstronaut,
  closeWhite,
} from 'styles/variables/iconURLs';
import { shadows, seashell } from '../../styles/variables/colors_tiles_v4';

function isActive(menuName, activeMenu) {
  return menuName === activeMenu;
}

const getIconStyle = (url) => ({
  backgroundImage: `url(${url})`,
});
const TopBar = ({ handleMenuClick, activeMenu, handleNotificationClick }) => {
  const mainIsActive = isActive(activeMenu, MENU_INTERFACE.MAIN.name);
  const telescopesIsActive = isActive(activeMenu, MENU_INTERFACE.TELESCOPES.name);
  const searchIsActive = isActive(activeMenu, MENU_INTERFACE.SEARCH.name);
  const alertsIsActive = isActive(activeMenu, MENU_INTERFACE.ALERTS.name);
  const userIsActive = isActive(activeMenu, MENU_INTERFACE.PROFILE.name);
  return (
    <div className="root">

      <div className="left-menu">
        <ul className="button-list">
          <li>
            <Button
              handleClick={() => { handleMenuClick(MENU_INTERFACE.DEFAULT.name); }}
            >
              <div className="nav-icon" style={getIconStyle(sloohLogoAstronaut)} />
            </Button>
          </li>
          <li>
            <Button
              isActive={mainIsActive}
              handleClick={() => { handleMenuClick(MENU_INTERFACE.MAIN.name); }}
            >
              {mainIsActive ?
                <div className="nav-icon fa fa-close" /> :
                <div className="nav-icon" style={getIconStyle(threeLinesAstronaut)} />
              }
            </Button>
          </li>
          <li>
            <Button
              isActive={telescopesIsActive}
              handleClick={() => { handleMenuClick(MENU_INTERFACE.TELESCOPES.name); }}
            >
              {telescopesIsActive ?
                <div className="nav-icon fa fa-close" /> :
                <div className="nav-icon" style={getIconStyle(telescopeAstronaut)} />
              }
            </Button>
          </li>
          <li>
            <Button
              isActive={searchIsActive}
              handleClick={() => { handleMenuClick(MENU_INTERFACE.SEARCH.name); }}
            >
            {searchIsActive ?
              <div className="nav-icon fa fa-close" /> :
              <div className="nav-icon" style={getIconStyle(searchAstronaut)} />
            }
            </Button>
          </li>
        </ul>
      </div>



      <div className="center-menu">
        <CenterBar />
      </div>



      <div className="right-menu">
        <ul className="button-list">
          {/*<li>
            <Button
              isActive={isActive(activeMenu, MENU_INTERFACE.HELP.name)}
              handleClick={() => { handleMenuClick(MENU_INTERFACE.HELP.name); }}
            >
              <span className="fa fa-question-circle" />
            </Button>
          </li>*/}
          <li>
            <Button
              isActive={alertsIsActive}
              handleClick={() => { handleNotificationClick(MENU_INTERFACE.ALERTS.name); }}
            >
              <AlertsIcon isActive={alertsIsActive} />
            </Button>
          </li>
          <li>
            <ConnectUser
              render={user => (
                <Button
                  isActive={userIsActive}
                  handleClick={() => { handleMenuClick(MENU_INTERFACE.PROFILE.name); }}
                  theme={(user.isAuthorized) ? {} : { width: 'auto', padding: '0 20px' }}
                >
                  { user.isAuthorized &&
                    <div>
                      {userIsActive ?
                        <div className="nav-icon fa fa-close" /> :
                        <div className="nav-icon" style={getIconStyle(userAstronaut)} />
                      }
                    </div>
                  }
                  { !user.isAuthorized && <p>Sign in</p> }
                </Button>
              )}
            />
          </li>
        </ul>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background: ${seashell};
          border-bottom: 2px solid ${shadows};
        }

        .center-menu {
          flex-grow: 1;
        }

        .button-list {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .nav-icon {
          height: 15px;
          width: 15px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0 auto;
        }

      `}
      </style>
    </div>
  )
};

export default TopBar;
