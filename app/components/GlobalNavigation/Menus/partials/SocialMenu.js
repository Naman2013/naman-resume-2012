import React from 'react';
import { black, white } from '../../../../styles/variables/colors';

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
        border-top: 1px solid ${black};
        border-bottom: 1px solid ${black};
      }

      .buttons {
        display: flex;
        list-style-type: none;
      }

      .action {
        color: ${white};
        font-size: 22px;
        display: inline-block;
        margin-right: 20px;
      }
    `}</style>
  </div>
);

export default SocialMenu;
