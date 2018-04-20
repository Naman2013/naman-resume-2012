/***********************************
* V4 Community Groups List Item Default View
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {
} from '../../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const GroupDefaultView = ({
  accessDescription,
  title,
  memberCountDisplay,
}) => (
  <div className="group-item">
    <h3 dangerouslySetInnerHTML={{ __html: accessDescription }} />
    <h2 dangerouslySetInnerHTML={{ __html: title }} />

    <h4 className="count" dangerouslySetInnerHTML={{ __html: memberCountDisplay }} />

    <style jsx>{`
      .group-item {
        display: flex;
        flex-direction: column;
        position: relative;
        color: ${white};
        background-color: ${darkBlueGray};
        margin: 30px;
        padding: 25px;
        width: 300px;
        height: 400px;
        text-align: center;
        align-items: center;
        justify-items: flex-start;
      }

      .count {
        margin-top: auto;
      }
    `}</style>
  </div>
)
export default GroupDefaultView;
