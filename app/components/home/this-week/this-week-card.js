import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useAbsoluteURL from '../../../utils/useAbsoluteURL';
import purgeHashURL from '../../../utils/purgeHashURL';
import { white, lightGray, darkBlueGray } from '../../../styles/variables/colors';
import './this-week.scss';

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
* Class: This Week Card
* Description: An individual informational card
********************************************************************/
class ThisWeekCard extends Component {
  render() {
    const {
      buttonText,
      buttonLink,
    } = this.props;

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
      <li className="card-container col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="card-content">
          <img className="card-image" src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Our_Telescopes.png"/>
          <p className="card-heading">OUR TELESCOPES</p>
          <p className="card-text">Situated in the Canary Islands and Chile, including daytime viewing of the Sun</p>
          <Link className="livetelescopes-card-button welcome-btn btn-primary" to={buttonLink}>{buttonText}</Link>
        </div>
      </li>
    );
  }
}

ThisWeekCard.propTypes = {
  title: PropTypes.string,
};

export default ThisWeekCard;
