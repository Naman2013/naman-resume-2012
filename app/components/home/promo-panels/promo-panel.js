import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white, lightGray, darkBlueGray } from '../../../styles/variables/colors';

/********************************************************************
* Class: PromoPanel
* Description: An individual promotional or informational panel
********************************************************************/
class PromoPanel extends Component {
  render() {
	const inlineStyle_PromoContainer = {
		minHeight: '500px',
		minWidth: '100%',
    backgroundColor: `${lightGray}`,
	};

  const inlineStyle_Heading = {
		color: `${this.props.headingColorRGB}`,
	};

	const inlineStyle_SubHeading = {
		color: `${this.props.subheadColorRGB}`,
	};


  const inlineStyle_promo = {
    background: `url(${this.props.imageURL}) center center no-repeat`,
    minHeight: '500px',
    maxHeight: '500px',
    minWidth: '100%',
  };

  const inlineStyle_info = {
    minHeight: '400px',
    maxHeight: '400px',
    minWidth: '60%',
    maxWidth: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '50%',
    backgroundColor: `${white}`,
  };

    return (
	<div style={inlineStyle_PromoContainer}>
	      {this.props.type == 'promotional' &&
		      <div style={inlineStyle_promo}>
        		<h2 style={inlineStyle_Heading} className="center">{this.props.heading}</h2>
		        <h3 style={inlineStyle_SubHeading} className="center">{this.props.subhead}</h3>
      		</div>
	      }

	      {this.props.type == 'informational' &&
		      <div style={inlineStyle_info}>
        		<h2 style={inlineStyle_Heading} className="center">{this.props.heading}</h2>
		        <h3 style={inlineStyle_SubHeading} className="center">{this.props.subhead}</h3>
      		</div>
	      }

	</div>

    );
  }
}

PromoPanel.propTypes = {
  title: PropTypes.string,
};

export default PromoPanel;
