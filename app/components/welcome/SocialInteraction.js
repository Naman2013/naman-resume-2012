import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { white, lightGray, darkBlueGray } from '../../styles/variables/colors';
import './welcome.scss';

class SocialInteraction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataElements = {
      pageNumber: '02',
      title: "SOCIAL<br/>INTERACTION",
      subtitle: "You wouldn't swim alone and you shouldn't explore space alone, either. Learn from others by exchanging ideas in the community and engaging with our teachers.",
      buttonText: 'Visit The Community',
      buttonLink: '/discussions/main/featured',
    }

    return (
      <div className="socialinteraction-container">
        <div className="socialinteraction-innercontainer">
          <img className="socialinteraction-top-dottedline" src="https://vega.slooh.com/assets/images/welcome/DottedLine_Long.png"/>
          <h1 id="pageNumber">{dataElements.pageNumber}</h1>
          <hr/>
          <h1 className="title" dangerouslySetInnerHTML={{ __html: dataElements.title }}/>
          <h2>{dataElements.subtitle}</h2>
          <Link to={dataElements.buttonLink} className="welcome-btn btn-primary" >{dataElements.buttonText}</Link>
        </div>
        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }

          .socialinteraction-top-dottedline {
              margin-top: -20%;
          }

          .socialinteraction-container {
            width: 100%;
            height: 100%;
            background: url("https://vega.slooh.com/assets/images/welcome/Social_Graphic.png") center center no-repeat;
            background-size: 70% auto;
            min-height: 787px;
            text-align: center;
          }

          .socialinteraction-innercontainer {
              position: absolute;
              min-height: 100%;
              min-width: 100%;
              vertical-align: middle;
          }

          .socialinteraction-innercontainer h1 {
            min-width: 100%;
            position: relative;
            text-align: center;
            font-size: 3em;
            color: ${white};
          }

          .socialinteraction-innercontainer h2 {
              font-weight: normal;
              font-size: 1.5em;
              color: ${white};
              max-width: 40%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 30px;
          }

          .socialinteraction-innercontainer hr {
              color: white;
              font-weight: bold;
              min-width: 7%;
              max-width: 7%;
          }

        `}</style>
      </div>
    );
  }
}

export default SocialInteraction;
