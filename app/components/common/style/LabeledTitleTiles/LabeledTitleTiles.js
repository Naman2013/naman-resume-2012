/***********************************
* V4 Object Detail List populated with info
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import { astronaut, geyser, shadows } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';

const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

const LabeledTitleTiles = ({
  tiles,
}) => (
  <div className="wide-info-block">
    {Object.keys(tiles).map(tilesItem => (
      <div className="wide-info-item" key={uniqueId()}>
        <div
          className="wide-info-block-header"
          dangerouslySetInnerHTML={{ __html: tiles[tilesItem].label }}
        />
        <div
          className="wide-info-block-name"
          dangerouslySetInnerHTML={{ __html: tiles[tilesItem].text }}
        />
      </div>
    ))}
    <style jsx>{`
      .wide-info-block {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 100px;
        color: ${astronaut};
      }


      .wide-info-item {
        flex: 1 1 0;
        border-top: 1px solid ${shadows};
        border-right: 1px solid ${shadows};
        border-bottom: 1px solid ${shadows};
        text-align: left;
        overflow: hidden;
      }

      .wide-info-item:first-child {
        border-left: 0;
      }

      .wide-info-item:last-child {
        border-right: 0;
      }

      .wide-info-block-name {
        font-size: 15px;
        padding: 10px;
        font-family: ${secondaryFont};
      }

      .wide-info-block-header {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 11px;
        padding: 10px;
      }

      @media ${screenLarge} {
        .wide-info-item {
          height: 100%;
        }
      }
    `}</style>
  </div>
);

LabeledTitleTiles.propTypes = {
  tiles: shape({}),
};

LabeledTitleTiles.defaultProps = {
  tiles: [],
}

export default LabeledTitleTiles;
