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
    position: 'relative',
		minHeight: '500px',
    maxHeight: '500px',
		minWidth: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    backgroundColor: `${lightGray}`,
	};

  const inlineStyle_Heading = {
		color: `${this.props.headingColorRGB}`,
    textAlign: 'center',
    marginTop: '0px',
    paddingTop: '20px',
	};

	const inlineStyle_SubHeading = {
		color: `${this.props.subheadColorRGB}`,
    textAlign: 'center',
    marginTop: '0px',
    paddingTop: '20px',
	};


  const inlineStyle_promo = {
    background: `url(${this.props.imageURL}) center center no-repeat`,
    minHeight: '500px',
    maxHeight: '500px',
    minWidth: '100%',
  };

  const inlineStyle_checkItOutButton_Promo = {
      position: 'absolute',
      top: '80%',
      textAlign: 'center',
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginLeft: 'auto',
      marginBottom: 'auto',
  };

  const inlineStyle_checkItOutButton_Info = {
      position: 'absolute',
      top: '80%',
      fontSize: '1.2em',
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 'auto',
      marginBottom: 'auto',
  };

  const inlineStyle_info = {
    position: 'absolute',
    minHeight: '400px',
    maxHeight: '400px',
    minWidth: '60%',
    maxWidth: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    top: '10%',
    backgroundColor: `${white}`,
  };

    return (
    	<div style={inlineStyle_PromoContainer}>
    	      {this.props.type == 'promotional' &&
    		      <div style={inlineStyle_promo}>
            		<h2 style={inlineStyle_Heading}>{this.props.heading}</h2>
    		        <h3 style={inlineStyle_SubHeading}>{this.props.subhead}</h3>
                <a style={inlineStyle_checkItOutButton_Promo} href={this.props.buttonLink} className="button btn-primary">{this.props.buttonText}</a>
          		</div>
    	      }

    	      {this.props.type == 'informational' &&
    		      <div style={inlineStyle_info}>
            		<h2 style={inlineStyle_Heading}>{this.props.heading}</h2>
    		        <h3 style={inlineStyle_SubHeading}>{this.props.subhead}</h3>
                <a style={inlineStyle_checkItOutButton_Info} href={this.props.buttonLink} className="button btn-primary">{this.props.buttonText}</a>
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
