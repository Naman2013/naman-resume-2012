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
    <div className={"dash-item" + (orderNumber === 1 ? '-first' : '')} key={uniqueId()}>  
    <h5>{('0' + orderNumber).slice(-2)}</h5>
    <h1 dangerouslySetInnerHTML={{ __html: title }} />
    <h3 dangerouslySetInnerHTML={{ __html: subtitle }} />
    {render()}
    <style jsx>{`
      .dash-item {
        text-align: center;
        padding: 0 25px;
        min-height: 400px;
      }
      h5 {
        font-family: "Brandon Grotesque","brandon-grotesque",sans-serif;
        font-weight: 700;
        font-size: 12px;
        color: #41566F;
        border-bottom: 2px solid #D8D8D8;
        width: 34px;
        margin: 0 auto;
        padding: 8px 0;
        letter-spacing: 2px;
      }
      h1 {
        font-family: "Brandon Grotesque","brandon-grotesque",sans-serif;
        font-weight: 900;
        font-size: 42px;
        color: #41566F;
        margin: 13px 0;
        letter-spacing: 6px;
        text-transform: uppercase;
      }
      h3 {
        font-family: "Adobe Garamond Pro", "adobe-garamond-pro", "Adobe Garamond", "Garamond", serif;
        font-size: 18px;
        color: #616E7D;
        letter-spacing: 1px;
      }

      .dash-item-first {
        text-align: center;
        padding: 0 25px;
        min-height: 400px;
        background-color: #213043;
        background-image: url("https://vega.slooh.com/assets/v4/dashboard/Darkest_Pattern_Canvas.png");
        background-size: 100px;
        padding-top: 280px;
        transition: padding ease-in-out 0.3s; 
      }
      .dash-item-first h5 {
        color: white;
        border-bottom: 2px solid #41566F;
      }
      .dash-item-first h1,
      .dash-item-first h3 {
        color: white;
      }

      @media all and (min-width: 641px) and (max-width: 768px) {
        .dash-item-first {
          padding-top: 240px;
        }
      }

      @media all and (max-width: 640px){
        .dash-item-first {
          padding-top: 40px;
        }
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
