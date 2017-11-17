import React, { Component } from 'react';
import PropTypes from 'prop-types';
import promoPanelStyles from './promo-panels.style';

/********************************************************************
* Class: PromoPanel
* Description: An individual promotional or informational panel
********************************************************************/
class PromoPanel extends Component {

  render() {
    return (
      <div className="promo-panel-container">
        hello world.
        {this.props.heading}
      </div>
    );
  }
}

PromoPanel.propTypes = {
  title: PropTypes.string,
};

export default PromoPanel;
