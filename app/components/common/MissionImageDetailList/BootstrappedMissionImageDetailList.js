/***********************************
* V4 Mission Image Detail List populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import BlueLineDrop from 'components/common/BlueLineDrop';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import { astronaut, geyser, shadows,  romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

const BootstrappedMissionImageDetailList = ({
  isDesktop,
  listTitle,
  isScreenLarge,
  imagingDetailList,
}) => {
  const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
    height: '50px',
    width: '50px',
    backgroundSize: 'cover',
  });

  return (
    <div>
      <BlueLineDrop
        title={listTitle}
        isDesktop={isDesktop}
        theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
        render={() => (
          <div>
            {!isDesktop ? <div className="title" dangerouslySetInnerHTML={{ __html: listTitle}} /> : null}
            <div className={classnames('detail-items', {
              'component-container': !isDesktop,
            })}>
              {imagingDetailList.seeingconditions ? (
              <div className="info" key={uniqueId()}>
                {imagingDetailList.seeingconditions.hasIconFlag ? (
                  <div style={profPic(imagingDetailList.seeingconditions.iconUrl)} />
                ) : null}
                <div
                  className="detail-label"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.seeingconditions.label
                  }}
                />
                <div
                  className="detail-text"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.seeingconditions.text
                  }}
                />
                <div
                  className="detail-text-detail"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.seeingconditions.textDetail
                  }}
                />
                <div
                  className="detail-note"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.seeingconditions.textNote
                  }}
                />
                {imagingDetailList.seeingconditions.hasLinkFlag ? (
                  <Link to={imagingDetailList.seeingconditions.linkUrl}>
                    <span
                      className="link"
                      dangerouslySetInnerHTML={{
                        __html: imagingDetailList.seeingconditions.linkLabel
                      }}
                    />
                  </Link>
                ) : null}
              </div>
            ) : null}
            {imagingDetailList.humidity ? (
              <div className="info half-info" key={uniqueId()}>
                {imagingDetailList.humidity.hasIconFlag ? (
                  <div style={profPic(imagingDetailList.humidity.iconUrl)} />
                ) : null}
                <div
                  className="detail-label"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.humidity.label
                  }}
                />
                <div
                  className="detail-text"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.humidity.text
                  }}
                />
                <div
                  className="detail-text-detail"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.humidity.textDetail
                  }}
                />
                <div
                  className="detail-note"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.humidity.textNote
                  }}
                />
                {imagingDetailList.humidity.hasLinkFlag ? (
                  <Link to={imagingDetailList.humidity.linkUrl}>
                    <span
                      className="link"
                      dangerouslySetInnerHTML={{
                        __html: imagingDetailList.humidity.linkLabel
                      }}
                    />
                  </Link>
                ) : null}
              </div>
            ) : null}
            {imagingDetailList.wind ? (
              <div className="info half-info" key={uniqueId()}>
                {imagingDetailList.wind.hasIconFlag ? (
                  <div style={profPic(imagingDetailList.wind.iconUrl)} />
                ) : null}
                <div
                  className="detail-label"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.wind.label
                  }}
                />
                <div
                  className="detail-text"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.wind.text
                  }}
                />
                <div
                  className="detail-text-detail"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.wind.textDetail
                  }}
                />
                <div
                  className="detail-note"
                  dangerouslySetInnerHTML={{
                    __html: imagingDetailList.wind.textNote
                  }}
                />
                {imagingDetailList.wind.hasLinkFlag ? (
                  <Link to={imagingDetailList.wind.linkUrl}>
                    <span
                      className="link"
                      dangerouslySetInnerHTML={{
                        __html: imagingDetailList.wind.linkLabel
                      }}
                    />
                  </Link>
                ) : null}
              </div>
            ) : null}
            </div>
          </div>
        )}
      />
      <style jsx>{`
        .component-container {

        }

        .title {
          padding: 25px;
          text-align: center;
          width: 85%;
        }

        .info {
          padding: 25px;
        }


        .detail-items {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          background-color: ${romance};
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
        .info {
          flex: 0 100%;
          padding: 25px;
          border: 1px solid ${shadows};
        }

        .detail-note,
        .link {
          font-family: ${secondaryFont};
          font-size: 12px;
          color: ${geyser};
          font-style: italic;
        }


        @media all and (min-width: 641px) and (max-width: 768px) {

          .scheduledby {
            flex: 0 0 100%;
          }


          .title {
            flex: 0 0 100%;
            font-size: 12px;
            padding: 10px 0;
            text-align: center;
            width: 100%;
          }

          .half-info {
            width: 50%;
          }

        }
        @media all and (max-width: 640px){


          .scheduledby {
            flex: 0 0 100%;
          }

          .observer-avatar {
            margin: 0 auto;
          }

          .title {
            flex: 0 0 100%;
            font-size: 12px;
            padding: 10px 0;
            text-align: center;
            width: 100%;
          }

          .half-info {
            width: 50%;
          }

        }
      `}</style>
    </div>
  )
}

BootstrappedMissionImageDetailList.propTypes = {
  isDesktop: bool,
  listTitle: string,
  imagingDetailList: shape({
    wind: shape({
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
    seeingconditions: shape({
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
    humidity: shape({
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

BootstrappedMissionImageDetailList.defaultProps = {
  isDesktop: false,
  listTitle: '',
  imagingDetailList: {
    humidity: {},
    seeingconditions: {},
    wind: {},
  },
};

export default BootstrappedMissionImageDetailList;
