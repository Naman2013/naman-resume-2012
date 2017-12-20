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

          <div className="welcome-cards-container">
            <ul className="welcome-cards">
              <li className="card-container">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Our_Telescopes.png"/>
                  <p className="card-heading">OUR TELESCOPES</p>
                  <p className="card-text">Situated in the Canary Islands and Chile, including daytime viewing of the Sun</p>
                  <Link className="livetelescopes-card-button welcome-btn btn-primary" to={dataElements.buttonOurTelescopes.buttonLink}>{dataElements.buttonOurTelescopes.buttonText}</Link>
                </div>
              </li>

              <li className="card-container">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Tips.png"/>
                  <p className="card-heading">TIPS FROM THE PROS</p>
                  <p className="card-text">Featured objects chosen from the most popular in view at any time</p>
                  <Link className="welcometoslooh-link welcome-btn btn-primary" to={dataElements.buttonTips.buttonLink}>{dataElements.buttonTips.buttonText}</Link>
                </div>
              </li>

              <li className="card-container">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Tonights_Schedule.png"/>
                  <p className="card-heading">TONIGHT&apos;S SCHEDULE</p>
                  <p className="card-text">As reserved by Apprentice and Astronomer members, for everyone to see</p>
                  <Link className="welcome-btn btn-primary" to={dataElements.buttonTonightsSchedule.buttonLink}>{dataElements.buttonTonightsSchedule.buttonText}</Link>
                </div>
              </li>

              <li className="card-container">
                <div className="card-content">
                  <img src="https://vega.slooh.com/assets/images/welcome/Live_Telescopes_Personal_Photos.png"/>
                  <p className="card-heading">PERSONAL PHOTOS</p>
                  <p className="card-text">All members can take and share photos of everything you see</p>
                  <Link className="welcome-btn btn-primary" to={dataElements.buttonPersonalPhotos.buttonLink}>{dataElements.buttonPersonalPhotos.buttonText}</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <style jsx>{`
          #pageNumber {
            font-weight: bold;
            font-size: 1.4em;
            color: ${white};
          }

          .livetelescopes-top-dottedline {
              margin-top: -8%;
          }

          .livetelescopes-container {
            min-width: 100%;
            width: 100%;
            height: 100%;
            min-height: 1287px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .livetelescopes-innercontainer {
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
        `}</style>
      </div>
    );
  }
}

export default LiveTelescopes;
