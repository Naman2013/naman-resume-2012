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

const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

const LabeledTitleTiles = ({
  list,
}) => (
  <div className="wide-info-block">
    {list.map(listItem => (
      <div className="wide-info-item" key={uniqueId()}>
        <div
          className="wide-info-block-header"
          dangerouslySetInnerHTML={{ __html: listItem.label }}
        />
        <div
          className="wide-info-block-name"
          dangerouslySetInnerHTML={{ __html: listItem.text }}
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
      }

      .wide-info-item:first-child {
        border-left: 0;
      }

      .wide-info-item:last-child {
        border-right: 0;
      }

      .wide-info-block-name {
        font-size: 20px;
        padding: 10px;
        font-family: ${secondaryFont};
      }

      .wide-info-block-header {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 11px;
        padding: 10px;
      }
    `}</style>
  </div>
);

LabeledTitleTiles.propTypes = {
  list: arrayOf(shape({
    title: string,
    label: string,
  })),
};

LabeledTitleTiles.defaultProps = {
  list: [],
}

export default LabeledTitleTiles;
