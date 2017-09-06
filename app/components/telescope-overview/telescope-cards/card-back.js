import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import './card-back.scss';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';

const Markdown = require('react-remarkable');

function generateSpecItem(spec) {
  return '<Markdown source={spec} />';
}

function generateSpecList(specList) {
  return specList.map(generateSpecItem).join('');
}


class CardBack extends Component {

  render() {
    const { teleId, activeTelescopeMissions, telescopeCardBack } = this.props;

    if (!telescopeCardBack.teleId) {
      return (
        <div className="telescope-card-back">
          <GenericLoadingBox />
        </div>
      );
    }

    return (
      <div className="telescope-card-back">
        <div className="card-header">

          <button onClick={this.props.handleFlip} className="flip-card-action" >
            <img className="icon" alt="flip card" target="_blank" src="https://vega.slooh.com/assets/icons/flip-back-arrow.png" />
          </button>

          <img className="obs_icon" alt="observatory icon" src={telescopeCardBack.headerArray.observatoryIconURL} width="50" height="50" />
          <div className="pier-title">
            <Markdown source={telescopeCardBack.headerArrayOverview.pierName} />
          </div>
        </div>

        <div className="telescope-specs">
          {
            telescopeCardBack.telescopeArray.telescopeList.map((telescope) => {
              return (
                <div>
                  <figure className="telescope-image">

                    <div className="telescope-name">
                      <Markdown source={telescope.telescopeName} />
                    </div>

                    <a href={telescope.imageURL} rel="noopener noreferrer" target="_blank">
                      <img
                        src={telescope.imageThumbnailURL}
                        alt="Telescope Preview"
                        width="259"
                        height="180"
                      />
                    </a>

                    <figcaption className="caption">
                      <Markdown source={telescope.imageCaption1} />
                    </figcaption>
                    <figcaption className="caption">
                      <Markdown source={telescope.imageCaption2} />
                    </figcaption>
                  </figure>

                  <div className="content" key={uniqueId('content_')}>
                    <h3 className="title">
                      <Markdown source={telescope.specTitle} />
                    </h3>

                    {telescope.specArray.map(
                      (spec) => {
                        return (
                          <div key={uniqueId('spec_')}>
                            <Markdown source={spec} key={uniqueId('spec_')} />
                          </div>
                        );
                      }
                    )}
                    <hr className="tele-spec-hr" />
                  </div>
                </div>
              );
            }
          )
        }
          <div className="content">
            <h3 className="title">
              <Markdown source={telescopeCardBack.locationArray.locationTitle} />
            </h3>

            {telescopeCardBack.locationArray.locationDataArray.map(
              (loc) => {
                return <Markdown source={loc}key={uniqueId('loc_')} />
              }
            )}
          </div>
        </div>

        <style jsx> {`
          img.obs_icon {
            margin-bottom: 20px;
          }
          /* Custom Scrollbar */
          div.telescope-specs::-webkit-scrollbar {
            width: 7px;
          }
          div.telescope-specs::-webkit-scrollbar-track {
            background: white;

          }
          div.telescope-specs::-webkit-scrollbar-thumb {
            background: #3c4a55;
          }
          div.location-section {
            text-align: center;
            margin-top: 20px;
          }
          hr.tele-spec-hr {
            width: 50%;
            color: grey;
            height:5px;
            margin-top: 10px;
            margin-bottom:10px;
            border-top: 1px solid #3c4655;
          }
          .telescope-name h2 {
            font-size: 1.5em;
          }
          `}
        </style>
      </div>
    );
  }
}


CardBack.defaultProps = {
  teleName: '',
  teleId: '',
  telescopeCardBack: {},
};

CardBack.propTypes = {
  teleName: PropTypes.string,
  teleId: PropTypes.string,
  handleFlip: PropTypes.func,
  telescopeCardBack: PropTypes.object,
};

export default CardBack;
