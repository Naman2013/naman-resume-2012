import React from 'react';
import { Link } from 'react-router';
import {
  astronaut,
  golda,
} from '../../../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../../../styles/variables/fonts';

const SecondaryButton = ({ anchor, text, isExternalLink, indent }) => (
  <div className="secondary-button">
    {indent === true && isExternalLink === true &&
      <>
        <a className="action indent" href={anchor} target="_blank">
          <span className="link-text">{text}</span>
        </a>
      </>
    }
    {indent === true && isExternalLink === false &&
      <>
        <Link className="action indent" to={anchor}>
          <span className="link-text">{text}</span>
        </Link>
      </>
    }
    {indent === false && isExternalLink === true &&
      <>
        <a className="action" href={anchor} target="_blank">
          <span className="link-text">{text}</span>
        </a>
      </>
    }
    {indent === false && isExternalLink === false &&
      <>
        <Link className="action" to={anchor}>
          <span className="link-text">{text}</span>
        </Link>
      </>
    }

    <style jsx>
      {`
        .indent {
          margin-left: 20px !important;
        }
        
        .secondary-button {
          font-size: 10px;
          font-family: ${primaryFont};
          color: ${astronaut};
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .secondary-button :global(.action) {
          color: ${astronaut};
          text-decoration: none;
          display: inline-block;
          padding: 20px 0 20px 20px;
        }

        .secondary-button :global(.action:hover) {
          color: ${golda};
        }
      `}
    </style>
  </div>
);

export default SecondaryButton;
