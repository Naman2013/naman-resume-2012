import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { black, white, lightGray, darkBlueGray } from '../../styles/variables/colors';
import './welcome.scss';

class HumanWisdom extends Component {
  render() {
    const dataElements = {
      pageNumber: '03',
      title: "GATHERED<br/>HUMAN WISDOM",
      subtitle: "Take in our curation of human response to space since the down of civilization, in Science, Art & Culture, Spirituality and more.",
      buttonText: 'Best of Illuminations',
      buttonLink: '/best-of-slooh',
    }

    return (
      <div className="humanwisdom-container">
        <div className="humanwisdom-innercontainer">
          <img className="humanwisdom-top-dottedline" src="https://vega.slooh.com/assets/images/welcome/DottedLine_Long.png"/>
          <h1 id="pageNumber">{dataElements.pageNumber}</h1>
          <hr/>
          <h1 className="title" dangerouslySetInnerHTML={{ __html: dataElements.title }}/>
          <h2>{dataElements.subtitle}</h2>

          <div className="welcome-cards-container">
            <ul className="welcome-cards clearfix">
              <li className="card-container col-md-3 col-sm-6 col-xs-12">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/HumanWisdom_Science.png"/>
                  <p className="card-heading">SCIENCE</p>
                  <p className="card-text">Scientific knowledge is the mind&apos;s eye in the looking glass</p>
                </div>
              </li>

              <li className="card-container col-md-3 col-sm-6 col-xs-12">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/HumanWisdom_Art_Culture.png"/>
                  <p className="card-heading">ART & CULTURE</p>
                  <p className="card-text">A curation of content and artistry inspired by space in any creative pursuit</p>
                </div>
              </li>

              <li className="card-container col-md-3 col-sm-6 col-xs-12">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/HumanWisdom_Human_Spirit.png"/>
                  <p className="card-heading">HUMAN SPIRIT</p>
                  <p className="card-text">A record of beliefs about space across civilization from antiquity to present</p>
                </div>
              </li>

              <li className="card-container col-md-3 col-sm-6 col-xs-12">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/HumanWisdom_DIY.png"/>
                  <p className="card-heading">DO-IT-YOURSELF</p>
                  <p className="card-text">Personal stories of connection to the cosmos</p>
                </div>
              </li>
            </ul>
          </div>

          <Link to={dataElements.buttonLink} className="welcome-btn btn-primary" >{dataElements.buttonText}</Link>
        </div>
        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }

          .card-container {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
          }

          .humanwisdom-top-dottedline {
              margin-top: -10%;
          }

          .humanwisdom-container {
            width: 100%;
            height: 100%;
            min-height: 1087px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .humanwisdom-innercontainer {
              min-height: 100%;
              min-width: 100%;
              vertical-align: middle;
          }

          .humanwisdom-innercontainer h1 {
            min-width: 100%;
            position: relative;
            text-align: center;
            font-size: 3em;
            color: ${white};
          }

          .humanwisdom-innercontainer h2 {
              font-weight: normal;
              font-size: 1.5em;
              color: ${white};
              max-width: 40%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 30px;
          }

          .humanwisdom-innercontainer hr {
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

export default HumanWisdom;
