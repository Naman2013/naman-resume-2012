import React from 'react';
import BorderedContainer from './BorderedContainer';
import { white } from '../../../../styles/variables/colors';

const SocialMenu = () => (
  <div className="root">
    <BorderedContainer>
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
    </BorderedContainer>

    <style jsx>{`

      .buttons {
        display: flex;
        list-style-type: none;
        margin: 0;
      }

      .action {
        color: ${white};
        width: auto;
        font-size: 22px;
        display: inline-block;
        margin-right: 20px;
      }
    `}</style>
  </div>
);

export default SocialMenu;
