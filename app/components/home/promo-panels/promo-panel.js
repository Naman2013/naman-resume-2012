import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useAbsoluteURL from '../../../utils/useAbsoluteURL';
import purgeHashURL from '../../../utils/purgeHashURL';
import { white, lightGray, darkBlueGray } from '../../../styles/variables/colors';

/* generate a link or href depending on internal / external link */
function generateLink(URL, openInNewTab, content = '') {
    if (openInNewTab == true) {
      return (
        <a target="_blank" className="button btn-primary" href={URL}>{content}</a>
      );
    }
    else {
      return (
        <a className="button btn-primary" href={URL}>{content}</a>
      );
    }
}

/********************************************************************
* Class: PromoPanel
* Description: An individual promotional or informational panel
********************************************************************/
class PromoPanel extends Component {
  render() {
  	const inlineStyle_PromoContainer = {
      position: 'relative',
  		minHeight: '650px',
      maxHeight: '650px',
  		minWidth: '100%',
      marginTop: '0px',
      marginBottom: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      backgroundColor: `${lightGray}`,
  	};

    const inlineStyle_promo = {
      /* background: `url(${this.props.imageURL}) center center no-repeat`,
      backgroundSize: 'auto 100%', */
      background: `url(${this.props.imageURL}) center center no-repeat`,
      backgroundSize: 'cover',
      minHeight: '650px',
      maxHeight: '650px',
      minWidth: '100%',
      textAlign: 'center',
    };

    const inlineStyle_promo_Heading = {
      position: 'relative',
      textTransform: 'uppercase',
  		color: `${this.props.headingColorRGB}`,
      textAlign: 'center',
      marginTop: '0px',
      paddingTop: '120px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '3em',
      fontWeight: 'bold',
      maxWidth: '600px',
  	};

  	const inlineStyle_promo_SubHeading = {
  		color: `${this.props.subheadColorRGB}`,
      textAlign: 'center',
      marginTop: '0px',
      paddingTop: '20px',
      fontSize: '18px',
  	};

    const inlineStyle_checkItOutButton_PromoDIV = {
      position: 'absolute',
      minWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      paddingTop: '90px',
    }

    return (
    	<div style={inlineStyle_PromoContainer}>
		      <div style={inlineStyle_promo}>
        		<h2 class="title" style={inlineStyle_promo_Heading}>{this.props.heading}</h2>
		        <h3 class="subtitle" style={inlineStyle_promo_SubHeading}>{this.props.subhead}</h3>
            <div style={inlineStyle_checkItOutButton_PromoDIV}>
              {generateLink(this.props.buttonLink, this.props.openInNewTab, this.props.buttonText)}
            </div>
      		</div>
    	</div>
    );
  }
}

PromoPanel.propTypes = {
  title: PropTypes.string,
};

export default PromoPanel;
