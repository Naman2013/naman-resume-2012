/***********************************
* V4 Dashboard Panel Item returns a component with generic panel information
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

const {
  func,
  number,
  string,
} = PropTypes;

const PanelItem = ({
  orderNumber,
  render,
  title,
  subtitle,
}) => (
  <div className="root" key={uniqueId()}>
    <h5>{('0' + orderNumber).slice(-2)}</h5>
    <h1 dangerouslySetInnerHTML={{ __html: title }} />
    <h3 dangerouslySetInnerHTML={{ __html: subtitle }} />
    {render()}
    <style jsx>{`
      .root {
        text-align: center;
        padding: 0 25px;
      }
    `}</style>
  </div>
);

PanelItem.propTypes = {
  orderNumber: number.isRequired,
  render: func.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
};
PanelItem.defaultProps = {};

export default PanelItem;
