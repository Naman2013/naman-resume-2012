import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { black, white, lightGray, darkBlueGray } from '../../styles/variables/colors';
import './welcome.scss';

class LiveTelescopes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataElements = {
      pageNumber: '01',
      title: "LIVE<br/>TELESCOPES",
      subtitle: "Look into space through our online telescopes, under your control or by anyone in the community.  Record your journey by taking pictures as you go.",
      buttonOurTelescopes: {
        buttonLink: '/telescope-overview/d7f673a5-7908-11e6-a635-0eb2b1774883',
        buttonText: 'Learn More',
      },
      buttonTips: {
        buttonLink: '/reservations/slooh-recommends/new',
        buttonText: 'Slooh Recommends',
      },
      buttonTonightsSchedule: {
        buttonLink: '',
        buttonText: 'View Schedule',
      },
      buttonPersonalPhotos: {
        buttonLink: '/my-pictures',
        buttonText: 'Photo Galleries',
      }
    }

    return (
      <div className="livetelescopes-container">
        <div className="livetelescopes-innercontainer">
          <img className="livetelescopes-top-dottedline" src="https://vega.slooh.com/assets/images/welcome/DottedLine.png"/>
          <h1 id="pageNumber">{dataElements.pageNumber}</h1>
          <hr/>
          <h1 className="title" dangerouslySetInnerHTML={{ __html: dataElements.title }}/>
          <h2>{dataElements.subtitle}</h2>

          <div className="livetelescopes-cardcontainer">
            <div className="livetelescopes-card">
              <img className="livetelescopes-card-image" src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Our_Telescopes.png"/>
              <p className="livetelescopes-card-heading">OUR TELESCOPES</p>
              <p>Situated in the Canary Islands and Chile, including daytime viewing of the Sun</p>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card">
              <img className="livetelescopes-card-image" src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Tips.png"/>
              <p className="livetelescopes-card-heading">TIPS FROM THE PROS</p>
              <p>Featured objects chosen from the most popular in view at any time</p>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card">
              <img className="livetelescopes-card-image" src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Tonights_Schedule.png"/>
              <p className="livetelescopes-card-heading">TONIGHT&apos;S SCHEDULE</p>
              <p>As reserved by Apprentice and Astronomer members, for everyone to see</p>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card">
              <img className="livetelescopes-card-image" src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Personal_Photos.png"/>
              <p className="livetelescopes-card-heading">PERSONAL PHOTOS</p>
              <p>All members can take and share photos of everything you see</p>
            </div>
          </div>

          <div className="livetelescopes-cardcontainer livetelescopes-cardcontainerfooter">
            <div className="livetelescopes-card livetelescopes-cardfooter">
              <Link className="welcometoslooh-link welcome-btn btn-primary" to={dataElements.buttonOurTelescopes.buttonLink}>{dataElements.buttonOurTelescopes.buttonText}</Link>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card livetelescopes-cardfooter">
              <Link className="welcometoslooh-link welcome-btn btn-primary" to={dataElements.buttonTips.buttonLink}>{dataElements.buttonTips.buttonText}</Link>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card livetelescopes-cardfooter">
              <Link className="welcometoslooh-link welcome-btn btn-primary" to={dataElements.buttonTonightsSchedule.buttonLink}>{dataElements.buttonTonightsSchedule.buttonText}</Link>
            </div>

            <div className="livetelescopes-cardspacer"/>

            <div className="livetelescopes-card livetelescopes-cardfooter">
              <Link className="welcometoslooh-link welcome-btn btn-primary" to={dataElements.buttonPersonalPhotos.buttonLink}>{dataElements.buttonPersonalPhotos.buttonText}</Link>
            </div>
          </div>

        </div>
        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }


          .livetelescopes-card-image {
              padding-top: 20%;
              padding-bottom: 10%;
          }

          .livetelescopes-top-dottedline {
              margin-top: 0px;
          }

          .livetelescopes-cardcontainer {
              display: block;
              min-height: 400px;
              height: 400px;
              min-width: 80%;
              width: 80%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 50px;
              padding-top: 50px;
          }

          .livetelescopes-cardcontainerfooter {
            min-height: 50px !important;
            height: 50px !important;
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            margin-top: -10%;
          }

          .livetelescopes-cardspacer {
            padding-left: 10px;
            padding-right: 10px;
            background-color: ${black};
            min-height: 100%;
            float: left;
          }

          .livetelescopes-card {
            width: 23%;
            padding-left: 10px;
            padding-right: 10px;
            background-color: ${white};
            min-height: 100%;
            float: left;
          }

          .livetelescopes-cardfooter {
            min-height: auto !important;
            background-color: ${black};
          }

          .livetelescopes-card-heading {
              font-weight: bold;
              padding-bottom: 5%;
          }

          .livetelescopes-container {
            width: 100%;
            height: 100%;
            min-height: 1287px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .livetelescopes-innercontainer {
              position: absolute;
              min-height: 100%;
              min-width: 100%;
              vertical-align: middle;
          }

          .livetelescopes-innercontainer h1 {
            min-width: 100%;
            position: relative;
            text-align: center;
            font-size: 3em;
            color: ${white};
          }

          .livetelescopes-innercontainer h2 {
              font-weight: normal;
              font-size: 1.5em;
              color: ${white};
              max-width: 40%;
              margin-left: auto;
              margin-right: auto;
              padding-bottom: 30px;
          }

          .livetelescopes-innercontainer hr {
              color: white;
              font-weight: bold;
              min-width: 7%;
              max-width: 7%;
          }

          .livetelescopes-innercontainer-buttons {
              position: absolute;
              min-height: 100%;
              min-width: 100%;
              margin-left: auto;
              margin-right: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default LiveTelescopes;
