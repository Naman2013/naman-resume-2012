/***********************************
* V4 Object Detail List populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import { darkGray, lightGray, gray } from 'styles/variables/colors';
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
      listTitle,
      objectDetailList,
    } = this.props;
    const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
      height: '50px',
      width: '50px',
      backgroundSize: 'cover',
    });

    return (
  <div className="root">
    {isDesktop ? (
      <div className="wide-info-block">
        {objectDetailList.name ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{ __html: objectDetailList.name.label }}
            />
            <div
              className="wide-info-block-name"
              dangerouslySetInnerHTML={{ __html: objectDetailList.name.text }}
            />
          </div>
        ) : null}
        {objectDetailList.domain ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{
                __html: objectDetailList.domain.label
              }}
            />
            <div
              className="wide-info-block-name"
              dangerouslySetInnerHTML={{ __html: objectDetailList.domain.text }}
            />
          </div>
        ) : null}
        {objectDetailList.constellation ? (
          <div className="wide-info-item">
            <div
              className="wide-info-block-header"
              dangerouslySetInnerHTML={{
                __html: objectDetailList.constellation.label
              }}
            />
            <div
              className="wide-info-block-name"
              dangerouslySetInnerHTML={{
                __html: objectDetailList.constellation.text
              }}
            />
          </div>
        ) : null}
      </div>
    ) : null}
    {!isDesktop ? (
      <div>
        <div className="title-container">
          <span
            className="title"
            dangerouslySetInnerHTML={{ __html: listTitle }}
          />
        </div>
        <div className="detail-items">
          {objectDetailList.name ? (
            <div className="info object-name" key={uniqueId()}>
              {objectDetailList.name.hasIconFlag ? (
                <div style={profPic(objectDetailList.name.iconUrl)} />
              ) : null}
              <div
                className="detail-label"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.name.label
                }}
              />
              <div
                className="detail-text"
                dangerouslySetInnerHTML={{ __html: objectDetailList.name.text }}
              />
              <div
                className="detail-text-detail"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.name.textDetail
                }}
              />
              <div
                className="detail-note"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.name.textNote
                }}
              />
              {objectDetailList.name.hasLinkFlag ? (
                <Link to={objectDetailList.name.linkUrl}>
                  <span
                    className="link"
                    dangerouslySetInnerHTML={{
                      __html: objectDetailList.name.linkLabel
                    }}
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
          {objectDetailList.domain ? (
            <div className="info half-info" key={uniqueId()}>
              {objectDetailList.name.hasIconFlag ? (
                <div style={profPic(objectDetailList.domain.iconUrl)} />
              ) : null}
              <div
                className="detail-label"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.domain.label
                }}
              />
              <div
                className="detail-text"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.domain.text
                }}
              />
              <div
                className="detail-text-detail"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.domain.textDetail
                }}
              />
              <div
                className="detail-note"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.domain.textNote
                }}
              />
              {objectDetailList.domain.hasLinkFlag ? (
                <Link to={objectDetailList.domain.linkUrl}>
                  <span
                    className="link"
                    dangerouslySetInnerHTML={{
                      __html: objectDetailList.domain.linkLabel
                    }}
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
          {objectDetailList.constellation ? (
            <div className="info half-info" key={uniqueId()}>
              {objectDetailList.constellation.hasIconFlag ? (
                <div style={profPic(objectDetailList.constellation.iconUrl)} />
              ) : null}
              <div
                className="detail-label"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.constellation.label
                }}
              />
              <div
                className="detail-text"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.constellation.text
                }}
              />
              <div
                className="detail-text-detail"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.constellation.textDetail
                }}
              />
              <div
                className="detail-note"
                dangerouslySetInnerHTML={{
                  __html: objectDetailList.constellation.textNote
                }}
              />
              {objectDetailList.constellation.hasLinkFlag ? (
                <Link to={objectDetailList.constellation.linkUrl}>
                  <span
                    className="link"
                    dangerouslySetInnerHTML={{
                      __html: objectDetailList.constellation.linkLabel
                    }}
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    ) : null}

    <style jsx>{`
      .title-container {
        text-transform: uppercase;
        color: ${darkGray};
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
        margin-top: 25px;
      }

      .wide-info-item {
        flex: 1 1 0;
        border: 1px solid ${gray};
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
        border: 1px solid ${gray};
      }

      .wide-info-block-header {
        font-weight: bold;
        font-size: 11px;
        padding: 10px;
      }

      .wide-info-block-name {
        font-size: 20px;
        padding: 10px;
        font-family: ${secondaryFont};
      }

      .detail-label {
        text-transform: uppercase;
        color: ${darkGray};
        font-weight: bold;
        font-size: 10px;
      }

      .detail-text {
        text-transform: uppercase;
        color: ${darkGray};
        font-weight: bold;
        font-size: 12px;
      }
      .detail-text-detail {
        text-transform: uppercase;
        color: ${darkGray};
        font-weight: bold;
        font-size: 12px;
      }

      .detail-items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 25px;
        -moz-box-shadow: 0 2px 4px 1px ${gray};
        -webkit-box-shadow: 0 2px 4px 1px ${gray};
        box-shadow: 0 2px 4px 1px ${gray};
      }
      .detail-note,
      .link {
        font-family: ${secondaryFont};
        font-size: 12px;
        color: ${lightGray};
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
