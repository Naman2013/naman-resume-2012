import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useAbsoluteURL from '../../../utils/useAbsoluteURL';
import purgeHashURL from '../../../utils/purgeHashURL';
import { white, lightGray, darkBlueGray } from '../../../styles/variables/colors';
import './this-week.scss';

/* generate a link or href depending on internal / external link */
function generateLink(URL, openInNewTab, content = '') {    
    if (openInNewTab == true) {
      return (
        <a target="_blank" className="button btn-primary card-button" href={URL}>{content}</a>
      );
    }
    else {
      return (
        <a className="button btn-primary card-button" href={URL}>{content}</a>
      );
    }
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
      heading,
      subhead,
      headingColorRGB,
      subheadColorRGB,
      imageURL,
      openInNewTab,
    } = this.props;

  	const cardBackgroundContentInlineStyle = {
      background: `url(${imageURL}) no-repeat top center`,
      backgroundSize: '100% auto',
      minWidth: '100%',
      maxHeight: '30%',
      minHeight: '150px',
  	};

    const inlineStyle_heading = {
  		color: `${headingColorRGB}`,
      textAlign: 'left',
      marginTop: '0px',
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop: '5%',
      fontWeight: 'bold',
      fontSize: '1em',
      textTransform: 'uppercase',
  	};

  	const inlineStyle_subHeading = {
  		color: `${subheadColorRGB}`,
      textAlign: 'left',
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop: '5%',
      fontSize: '0.95em',
  	};

    return (
      <li className="card-container col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="card-content">
          <div style={cardBackgroundContentInlineStyle}/>
          <h1 style={inlineStyle_heading}>{heading}</h1>
          <h2 style={inlineStyle_subHeading}>{subhead}</h2>
        </div>
        <div className="card-content-button">
          {generateLink(buttonLink, openInNewTab, buttonText)}
        </div>
      </li>
    );
  }
}

ThisWeekCard.propTypes = {
  title: PropTypes.string,
};

export default ThisWeekCard;
