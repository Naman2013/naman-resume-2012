import React from 'react';
import { astronaut, shadows } from '../../../../styles/variables/colors_tiles_v4';

const SocialMenu = () => (
  <div className="root">
    <ul className="buttons">
      <li>
        <a className="action" href="#">
          <span className="fa fa-twitter" />
        </a>
      </li>
      <li>
        <a className="action" href="#">
          <span className="fa fa-facebook" />
        </a>
      </li>
      <li>
        <a className="action" href="#">
          <span className="fa fa-instagram" />
        </a>
      </li>
    </ul>

    <style jsx>{`
      .root {
        padding: 25px;
        border-bottom: 1px solid ${shadows};
      }
      .buttons {
        display: flex;
        list-style-type: none;
        margin: 0;
      }

      .action {
        color: ${astronaut};
        width: auto;
        font-size: 22px;
        display: inline-block;
        margin-right: 20px;
      }
    `}</style>
  </div>
);

export default SocialMenu;
