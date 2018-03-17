import React from 'react';
import Button from './Button';
import CenterBar from './CenterBar';
import MENU_INTERFACE from './Menus/MenuInterface';
import { darkGray } from '../../styles/variables/colors';

function isActive(menuName, activeMenu) {
  return menuName === activeMenu;
}

const TopBar = ({ handleMenuClick, activeMenu }) => (
  <div className="root">

    <div className="left-menu">
      <ul className="button-list">
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.DEFAULT)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.DEFAULT) }}
          >
            <span className="fa fa-home"></span>
          </Button>
        </li>
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.MAIN)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.MAIN) }}
          >
            <span className="fa fa-bars"></span>
          </Button>
        </li>
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.TELESCOPES)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.TELESCOPES) }}
          >
            <span className="fa fa-circle"></span>
          </Button>
        </li>
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.SEARCH)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.SEARCH) }}
          >
            <span className="fa fa-search"></span>
          </Button>
        </li>
      </ul>
    </div>



    <div className="center-menu">
      <CenterBar />
    </div>



    <div className="right-menu">
      <ul className="button-list">
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.HELP)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.HELP) }}
          >
            <span className="fa fa-question-circle"></span>
          </Button>
        </li>
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.ALERTS)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.ALERTS) }}
          >
            <span className="fa fa-bell"></span>
          </Button>
        </li>
        <li>
          <Button
            isActive={isActive(activeMenu, MENU_INTERFACE.PROFILE)}
            handleClick={() => { handleMenuClick(MENU_INTERFACE.PROFILE) }}
          >
            <span className="fa fa-user"></span>
          </Button>
        </li>
      </ul>
    </div>

    <style jsx>{`
      .root {
        display: flex;
        justify-content: space-between;
        width: 100%;
        background: #333;
        border-bottom: 2px solid ${darkGray};
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

    `}</style>
  </div>
);

export default TopBar;
