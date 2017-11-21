import React from 'react';
import { primaryFont } from '../../styles/variables/fonts';
import { brightYellow } from '../../styles/variables/colors';

const Header = () => (
  <div>
    <h2 className="title">LIVE</h2>

    <style jsx>{`
      .title {
        font-size: 22px;
        margin: 0;
        padding: 0;
        font-family: ${primaryFont};
        font-weight: 800;
        color: ${brightYellow};
        text-transform: uppercase;
      }
    `}</style>
  </div>
);

export default Header;
