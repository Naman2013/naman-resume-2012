import React from 'react';
import { primaryFont } from '../../styles/variables/fonts';
import { yellow } from '../../styles/variables/colors';

const Header = () => (
  <div>
    <h2 className="title">LIVE</h2>

    <style jsx>{`
      .title {
        font-family: ${primaryFont};
        font-weight: 800;
        color: ${yellow};
        text-transform: uppercase;
      }
    `}</style>
  </div>
);

export default Header;
