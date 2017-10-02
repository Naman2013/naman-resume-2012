import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId'


import AsidePopup from '../common/modals/aside-popup';

class Feature extends Component {

  render() {
    const liNot = classnames('feature-li', {
      not: this.props.liNot,
    });

    const featureLiStyle = {
      fontSize: '1.1rem',
    };

    return (
      <li className={liNot} key={uniqueId('feature_')} style={featureLiStyle}>
        {this.props.content}
        {this.props.tooltip.show ? <i
          className="icon control info-white"
          onClick={() => {
            this.props.openPopup(this.props.id);
          }}
          style={this.props.actNowButtonSingletonCSS}
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
            color: rgba(95, 129, 222, 0.9)  !important;
            padding-left: 20px !important;
          }
          not:before {
            background: url(../assets/icons/not_b.svg) transparent top right no-repeat;
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

          .static-app-content-container ul.features li.feature-li {
            font-size: 1.1em;
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
  actNowButtonSingletonCSS: {},
};

Feature.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.object,
  liNot: PropTypes.bool,
  openPopup: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  actNowButtonSingletonCSS: PropTypes.object,
};

export default Feature;
