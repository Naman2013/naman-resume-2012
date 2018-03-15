import React from 'react';
import Button from './Button';
import CenterBar from './CenterBar';
import { darkGray } from '../../styles/variables/colors';

const TopBar = () => (
  <div className="root">

    <div className="left-menu">
      <ul className="button-list">
        <li>
          <Button>
            <span className="fa fa-bars">X</span>
          </Button>
        </li>
        <li>
          <Button>
            <span className="fa fa-bars">X</span>
          </Button>
        </li>
        <li>
          <Button>
            <span className="fa fa-bars">X</span>
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
          <Button>
            <span className="fa fa-bars">X</span>
          </Button>
        </li>
        <li>
          <Button>
            <span className="fa fa-bars">X</span>
          </Button>
        </li>
        <li>
          <Button>
            <span className="fa fa-bars">X</span>
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
