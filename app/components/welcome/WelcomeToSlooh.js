import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { white, lightGray, darkBlueGray } from '../../styles/variables/colors';

class WelcomeToSlooh extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataElements = {
      title: "WELCOME TO OUR COMMUNITY OF OVER",
      subtitle: "150,000",
      buttonText: 'Start Exploring',
      buttonLink: '',
    }

    return (
      <div className="welcometoslooh-container">
        <div className="welcometoslooh-innercontainer">
          <img className="welcometoslooh-top-dottedline" src="../../../assets/images/welcome/DottedLine_noballanchor.png"/>
          <img className="welcometoslooh-logo" src="../../../assets/images/welcome/slooh_logo_grey.png"/>
          <h2 className="title" dangerouslySetInnerHTML={{ __html: dataElements.title }}/>
          <h1>{dataElements.subtitle}</h1>

          <Link className="welcometoslooh-link btn-primary" to={dataElements.buttonLink}>{dataElements.buttonText}</Link>
          <Link className="welcometoslooh-link-topofpage" to="/welcome#topofpage">BACK TO TOP</Link>

          <img className="welcometoslooh-rocket" src="../../../assets/images/welcome/Rocket_Graphic.png"/>
        </div>

        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }

          .welcometoslooh-link {
            display: block;
            padding-top: 25px;
            padding-botton: 25px;
          }

          .welcometoslooh-link-topofpage a {
            display: block;
            padding-top: 25px;
            padding-botton: 25px;
            color: ${lightGray};
          }

          .welcometoslooh-rocket {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .welcometoslooh-logo {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .welcometoslooh-top-dottedline {
              margin-top: -30%;
          }

          .welcometoslooh-container {
            width: 100%;
            height: 100%;
            background: url("../../../assets/images/welcome/Stars.png") center center no-repeat;
            background-size: 100% auto;
            min-height: 987px;
            text-align: center;
          }

          .welcometoslooh-innercontainer {
              position: absolute;
              min-height: 100%;
              min-width: 100%;
              vertical-align: middle;
          }

          .welcometoslooh-innercontainer h1 {
            min-width: 100%;
            position: relative;
            text-align: center;
            font-size: 3em;
            color: ${white};
          }

          .welcometoslooh-innercontainer h2 {
              font-weight: normal;
              font-size: 1.5em;
              color: ${white};
              max-width: 40%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 30px;
          }

          .welcometoslooh-innercontainer hr {
              color: white;
              font-weight: bold;
              min-width: 7%;
              max-width: 7%;
          }

          .welcometoslooh-finalcontainer {
            display: block;
            min-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

        `}</style>
      </div>
    );
  }
}

export default WelcomeToSlooh;
