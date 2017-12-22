import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ThisWeekCard from './this-week-card';
import { black, white, lightGray, sloohDarkGray } from '../../../styles/variables/colors';
import './this-week.scss';

/********************************************************************
* Class: ThisWeekPanel
* Description: This Week (Informational) Panels/"Cards" on the homepage
********************************************************************/
class ThisWeekPanel extends Component {
  static defaultProps = {
    promoArray: [],
    heading: "This Week on Slooh",
  };

  generateThisWeekCards() {
    const { promoArray } = this.props;
    return promoArray.map(thisWeekObject => <ThisWeekCard {...thisWeekObject} />);
  }

  render() {
    const {
      promoArray,
    } = this.props;

    return (
      <div>

        {promoArray.length > 0 &&
          <div className="this-week-container">
            <div className="this-week-innercontainer">
              <h1>{this.props.heading}</h1>
              <div className="this-week-cards-container">
                <ul className="this-week-cards clearfix">
                  {this.generateThisWeekCards()}
                </ul>
              </div>
            </div>
          </div>
        }

        <style jsx>{`

          .card-image {
              margin-top: 15%;
              margin-bottom: 5%;
          }
          .card-container {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
          }

          .this-week-container {
            background-color: ${lightGray};
            color: ${white};
            width: 100%;
            height: 100%;
            text-align: center;
            margin-top: -20px;
            margin-left: auto;
            margin-right: auto;
          }

          .this-week-innercontainer {
            padding-top: 2%;
            padding-bottom: 2%;
          }

          .this-week-container h1 {
            font-weight: bold;
            color: ${sloohDarkGray};
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }
}

ThisWeekPanel.propTypes = {
  infoHeading: PropTypes.string,
  infoArray: PropTypes.array.isRequired,
};

export default ThisWeekPanel;
