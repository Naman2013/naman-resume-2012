import React from 'react';
import BorderContainer from './partials/BorderedContainer';
import { primaryFont } from '../../../styles/variables/fonts';
import { white, blueBlack, black, pink } from '../../../styles/variables/colors';

const Telescopes = () => (
  <div className="root">
    <BorderContainer top={false}>
      <button className="action">Setup a mission</button>
    </BorderContainer>

    <h4 className="title">Visit our telescope channels</h4>

    <style jsx>{`
      .root {
        color: ${white};
        font-family: ${primaryFont};
      }

      .title {
        font-size: 14px;
        text-transform: uppercase;
      }

      .action {
        border-radius: 5%;
        background: none;
        padding: 20px 40px;
        border: none;
        color: ${white};
        background: ${blueBlack};
      }

      .action:hover {
        background: ${pink};
      }
    `}</style>
  </div>
);

export default Telescopes;
