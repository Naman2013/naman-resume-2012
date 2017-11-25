import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { white, black, pink, lightBlack } from '../../styles/variables/colors';

const {
  string,
  bool,
} = PropTypes;

class UserStat extends Component {

  state = {
    popupIsOpen: false,
  }

  openPopup = () => {
    this.setState(() => ({
      popupIsOpen: true,
    }));
  }

  closePopup = () => {
    this.setState(() => ({
      popupIsOpen: false,
    }));
  }

  render() {
    const {
      title,
      hasTooltip,
      tooltipText,
      value,
    } = this.props;

    const {
      popupIsOpen
    } = this.state

    const popupRootClassnames = classnames('info-popup info-pointerleft', {
      hidden: !popupIsOpen,
    });


    return (
      <div
        className="stat"
      >
        <div className="stat-label">
          <span dangerouslySetInnerHTML={{ __html: title }} />
          <div className="stat-info-popup">
            {hasTooltip ? <i
              className="info-icon"
              onClick={() => {
                this.openPopup();
              }}
            >

            </i> : ''}
            <div className={popupRootClassnames}>
              <div className="control-close-small">
                <i className="fa fa-close close" onClick={this.closePopup} />
              </div>
              <div className="info-poptext" dangerouslySetInnerHTML={{ __html: tooltipText }} />
            </div>
          </div>
        </div>
        <span className="stat-value" dangerouslySetInnerHTML={{ __html: value }} />

        <style jsx>
          {`

            .stat {
              display: flex;
              flex-direction: column;
              padding: 0 25px;
              border-right: 1px solid ${lightBlack};
            }

            .stat-info-popup {
              position: relative;
              display: inline-block;
              margin-left: 10px;
              vertical-align: middle;
            }

            .stat:last-child {
              border: none;
            }
            .info-popup {
                background-color: white;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                -ms-border-radius: 8px;
                border-radius: 8px;
                box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2) !important;
                color: #557373;
                font-weight: 300;
                height: auto;
                left: 30px;
                top: -25px;
                margin: 0px;
                position: absolute !important;
                text-align: left;
                width: 210px;
                z-index: 9999;
              }
              .info-popup.info-pointerleft:before {
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                left: -23px;
                right: auto;
                top: 20px;
                bottom: auto;
                border: 12px solid;
                border-color: transparent white transparent transparent;
              }

              .info-poptext {
                padding: 10px;
                margin: 0;
                margin-left: 10px;
              }

              .info-icon {
                background-repeat: no-repeat;
                background-image: url('https://vega.slooh.com/assets/icons/info-white.svg');
                height: 15px;
                width: 15px;
                display: inline-block;
              }

              .info-icon:hover {
                cursor: help;
              }

              .static-app-content-container .control-close-small {
                height: 15px;
                right: 5px;
                top: 5px;
              }

              .close {
                margin-right: 5px;
              }
          `}
        </style>
      </div>
    );
  }

}

UserStat.propTypes = {
  hasTooltip: bool.isRequired,
  title: string.isRequired,
  tooltipText: string.isRequired,
  value: string.isRequired,
};
UserStat.defaultProps = {

};

export default UserStat;
