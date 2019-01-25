/***********************************
* V4 Object Detail List populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import { astronaut, geyser, shadows, romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';


const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

class ObjectDetailList extends Component {
  static propTypes = {
    isDesktop: bool,
    listTitle: string,
    objectDetailList: shape({
      constellation: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
      domain: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
      name: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
    }),
  }

  static defaultProps = {
    isDesktop: true,
    listTitle: '',
    objectDetailList: {
      name: {},
      domain: {},
      constellation: {},
    },
  };

  state = {
  };

  render() {
    const {
      isDesktop,
      isMobile,
      listTitle,
      objectDetailList,
      Domain,
      ObjectType,
      Constellation,
    } = this.props;
    const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
      height: '50px',
      width: '50px',
      backgroundSize: 'cover',
    });

    return (
  <div className="root">
    {!isMobile ? (
      <div className="wide-info-block">
        {ObjectType ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{ __html: ObjectType.label }}
            />
            <div
              className="wide-info-block-name"
              dangerouslySetInnerHTML={{ __html: ObjectType.text }}
            />
          </div>
        ) : null}
        {Domain ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{ __html: Domain.label }}
            />
            <div
              className="wide-info-block-name"
              dangerouslySetInnerHTML={{ __html: Domain.text }}
            />
          </div>
        ) : null}
        {Constellation ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{ __html: Constellation.label }}
            />
            {Constellation.hasLink
              ? <Link
                className="wide-info-block-name"
                to={Constellation.linkUrl}
                dangerouslySetInnerHTML={{ __html: Constellation.text }}
              /> 
              : <div
                className="wide-info-block-name"
                dangerouslySetInnerHTML={{ __html: Constellation.text }}
              />
            }
          </div>
        ) : null}
      </div>
    ) : null}

    <style jsx>{`
      .title-container {
        text-transform: uppercase;
        color: ${astronaut};
        font-weight: bold;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .wide-info-block {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }

      .wide-info-item {
        flex: 1 1 0;
        border: 1px solid ${shadows};
        padding: 25px;
        text-align: left;
        max-height: 135px;
      }

      .title {
        padding: 10px;
        text-align: center;
        width: 100%;
      }

      .info {
        padding: 25px;
        border: 1px solid ${shadows};
      }

      .wide-info-block-header {
        font-weight: bold;
        font-size: 11px;
        padding: 10px;
        text-transform: uppercase;
      }

      :global(.wide-info-block-name) {
        display: block;
        font-size: 20px;
        padding: 10px;
        font-family: ${secondaryFont};
      }

      .detail-label {
        text-transform: uppercase;
        color: ${astronaut};
        font-weight: bold;
        font-size: 10px;
      }

      .detail-text {
        text-transform: uppercase;
        color: ${astronaut};
        font-weight: bold;
        font-size: 12px;
      }
      .detail-text-detail {
        text-transform: uppercase;
        color: ${astronaut};
        font-weight: bold;
        font-size: 12px;
      }

      .detail-items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 25px;
        -moz-box-shadow: 0 2px 4px 1px ${shadows};
        -webkit-box-shadow: 0 2px 4px 1px ${shadows};
        box-shadow: 0 2px 4px 1px ${shadows};
        background-color: ${romance};
      }
      .detail-note,
      .link {
        font-family: ${secondaryFont};
        font-size: 12px;
        color: ${geyser};
        font-style: italic;
      }

      .object-name {
        flex: 0 0 100%;
      }

      .half-info {
        width: 50%;
      }
    `}</style>
  </div>
);

  }
}

export default ObjectDetailList;
