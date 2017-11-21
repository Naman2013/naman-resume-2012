import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useAbsoluteURL from '../../../utils/useAbsoluteURL';
import purgeHashURL from '../../../utils/purgeHashURL';
import { white, lightGray, darkBlueGray } from '../../../styles/variables/colors';

/* generate a link or href depending on internal / external link */
function generateLink(URL = '', content = '') {
  if (useAbsoluteURL(URL)) {
    return (
      <a className="button btn-primary" href={URL}>{content}</a>
    );
  }

  return (
    <Link className="button btn-primary" to={purgeHashURL(URL)}>{content}</Link>
  );
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
      fontSize: '3.75em',
      fontWeight: 'bold',
      maxWidth: '600px',
  	};

  	const inlineStyle_promo_SubHeading = {
  		color: `${this.props.subheadColorRGB}`,
      textAlign: 'center',
      marginTop: '0px',
      paddingTop: '20px',
      fontSize: '1.7em',
  	};

    const inlineStyle_checkItOutButton_PromoDIV = {
      position: 'absolute',
      minWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      paddingTop: '90px',
    }

    const inlineStyle_info = {
      position: 'absolute',
      minHeight: '500px',
      maxHeight: '500px',
      minWidth: '60%',
      maxWidth: '60%',
      marginLeft: '20%',
      marginRight: '20%',
      top: '75px',
      backgroundColor: `${white}`,
    };

    const inlineStyle_info_container = {
      position: 'relative',
      minHeight: '100%',
      minWidth: '100%',
    };

    const inlineStyle_info_photo = {
      float: 'left',
      minWidth: '60%',
      minHeight: '500px',
      maxHeight: '500px',
      background: `url(${this.props.imageURL}) center center no-repeat`,
      backgroundSize: 'cover',
    }

    const inlineStyle_info_data = {
      float: 'right',
      textAlign: 'left',
      width: '40%',
      paddingLeft: '30px',
      paddingRight: '20px',
      overflowY: 'auto',
      overflowX: 'hidden',
      maxHeight: '500px',
    }

    const inlineStyle_info_data_link = {
      paddingTop: '20%',
      textAlign: 'center',
    };

    const inlineStyle_info_Heading = {
      textTransform: 'uppercase',
  		color: `${this.props.headingColorRGB}`,
      textAlign: 'left',
      marginTop: '0px',
      paddingTop: '20px',
      fontWeight: 'bold',
  	};

  	const inlineStyle_info_SubHeading = {
  		color: `${this.props.subheadColorRGB}`,
      textAlign: 'left',
      marginTop: '0px',
      paddingTop: '20px',
  	};

    return (
    	<div style={inlineStyle_PromoContainer}>
    	      {this.props.type == 'promotional' &&
    		      <div style={inlineStyle_promo}>
            		<h1 style={inlineStyle_promo_Heading}>{this.props.heading}</h1>
    		        <h2 style={inlineStyle_promo_SubHeading}>{this.props.subhead}</h2>
                <div style={inlineStyle_checkItOutButton_PromoDIV}>
                  {generateLink(this.props.buttonLink, this.props.buttonText)}
                </div>
          		</div>
    	      }

    	      {this.props.type == 'informational' &&
    		      <div style={inlineStyle_info}>
                <div style={inlineStyle_info_container}>
                  <div style={inlineStyle_info_photo}>&nbsp;</div>

                  <div style={inlineStyle_info_data}>
              		    <h2 style={inlineStyle_info_Heading}>{this.props.heading}</h2>
      		            <h3 style={inlineStyle_info_SubHeading}>{this.props.subhead}</h3>
                      <div style={inlineStyle_info_data_link}>
                        {generateLink(this.props.buttonLink, this.props.buttonText)}
                      </div>
                  </div>
                </div>
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
