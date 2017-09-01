import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId'


import AsidePopup from '../common/modals/aside-popup';

class Feature extends Component {

  render() {
    /*
    closePopup: PropTypes.func,
    open: PropTypes.bool,
    popupOpen: PropTypes.string,
    popupText: PropTypes.string,
    display: PropTypes.string,
    contactLink: PropTypes.string,
    footerText: PropTypes.string,
    contactLinkText: PropTypes.string,
    */
    // if (this.props.tooltip.show === true) {
    //   const asidePopup = `<AsidePopup
    //     popupText=${this.props.tooltip.content}
    //   />`;
    // } else {
    //   const asidePopup = '';
    // }

    /*
    <ul className="features">
      <li>Shows: All</li>
      <li>Telescopes</li>
      <li>Take Pictures</li>
      <li>Community</li>
      <li>Unlimited Reservations <i onClick={() => {this.openPopup(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_UNLIMITED)}} className="icon control info-white">info</i>
      </li>
      <li>Objects: All
      </li>
      <li>Space Situation Room</li>
      <li>Slooh Road Trip <i onClick={() => {this.openPopup(PLAN_DESCRIPTIONS.SLOOH_ROAD_TRIP)}} className="icon control info-white">info</i></li>
    </ul>
    */


    const liNot = classnames('feature-li', {
      not: this.props.liNot,
    });

    return (
      <li className={liNot} key={uniqueId('feature_')}>
        {this.props.content}
        {this.props.tooltip.show ? <i
          className="icon control info-white"
          onClick={() => {
            this.props.openPopup(this.props.id);
          }}
        >
          info
        </i> : ''}
        <AsidePopup
          popupText={this.props.tooltip.content}
          popupOpen={this.props.tooltip.toolTipOpen}
          closePopup={this.props.closePopup}
        />
        <style jsx>{`
          .not{
            color: rgba(90, 130, 240, 0.6) !important;
            padding-left: 20px !important;
          }
          not:before {
            background: url(../icons/not_b.svg) transparent top right no-repeat;
            background-size: cover;
            content: "";
            height: 10px;
            left: 0;
            position: absolute;
            text-align: center;
            top: 40%;
            width: 10px;
            z-index: 99999;
            background-color: rgba(90, 130, 240, 0.6) !important;
          }
          `}
        </style>
      </li>
    );
  }

}


Feature.defaultProps = {
  content: '',
  tooltip: { show: false, content: '' },
  liNot: false,
};

Feature.propTypes = {
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  tooltip: PropTypes.object,
  liNot: PropTypes.bool,
  openPopup: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Feature;
