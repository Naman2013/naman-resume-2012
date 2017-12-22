import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { white, lightGray, darkBlueGray } from '../../styles/variables/colors';
import './welcome.scss';

class NetworkEffect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataElements = {
      pageNumber: '04',
      title: "NETWORK<br/>EFFECT",
      subtitle: "Every contribution leaves the experience different and better for everyone else.",
    }

    return (
      <div className="networkeffect-container">
        <div className="networkeffect-innercontainer">
          <img className="networkeffect-top-dottedline" src="https://vega.slooh.com/assets/images/welcome/DottedLine_Long.png"/>
          <h1 id="pageNumber">{dataElements.pageNumber}</h1>
          <hr/>
          <h1 className="title" dangerouslySetInnerHTML={{ __html: dataElements.title }}/>
          <h2>{dataElements.subtitle}</h2>
        </div>

        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }

          .networkeffect-top-dottedline {
              margin-top: 4%;
              padding-top: 2%;
          }

          .networkeffect-container {
            width: 100%;
            height: 100%;
            background: url("https://vega.slooh.com/assets/images/welcome/Network_Effect.png") center center no-repeat;
            background-size: 100% auto;
            min-height: 1387px;
            text-align: center;
          }

          .networkeffect-innercontainer {
              min-height: 100%;
              min-width: 100%;
              vertical-align: middle;
          }

          .networkeffect-innercontainer h1 {
            min-width: 100%;
            text-align: center;
            font-size: 3em;
            color: ${white};
          }

          .networkeffect-innercontainer h2 {
              font-weight: normal;
              font-size: 1.5em;
              color: ${white};
              max-width: 40%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 30px;
          }

          .networkeffect-innercontainer hr {
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

export default NetworkEffect;
