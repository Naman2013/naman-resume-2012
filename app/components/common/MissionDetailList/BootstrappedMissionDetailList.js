/***********************************
 * V4 Mission Detail List populated with info
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import BlueLineDrop from 'components/common/BlueLineDrop';
import { astronaut, geyser, shadows, romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

const { arrayOf, bool, shape, string } = PropTypes;

class BootstrappedMissionDetailList extends Component {
  static propTypes = {
    isDesktop: bool,
    listTitle: string,
    missionDetailList: shape({
      missiondate: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string
      }),
      observatory: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string
      }),
      scheduledby: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string
      }),
      telescope: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string
      })
    })
  };

  static defaultProps = {
    isDesktop: false,
    listTitle: "",
    missionDetailList: {
      scheduledby: {},
      observatory: {},
      missiondate: {},
      telescope: {}
    }
  };

  state = {
    showInfo: !this.props.isDesktop
  };

  toggleInfo = e => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo
    }));
  };

  render() {
    const { isDesktop, listTitle, missionDetailList, isScreenLarge } = this.props;
    const { showInfo } = this.state;
    const profPic = photoUrl =>
      Object.assign(profilePhotoStyle(photoUrl), {
        height: "50px",
        width: "50px",
        backgroundSize: "cover"
      });

    return (
      <div>
        <BlueLineDrop
          title={listTitle}
          isDesktop={isDesktop}
          theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
          render={() => (
            <div>
              {!isDesktop ? (
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: listTitle }}
                />
              ) : null}
              <div
                className={classnames("detail-items", {
                  "component-container": !isDesktop
                })}
              >
                {missionDetailList.missiondate ? (
                  <div className="info half-info" key={uniqueId()}>
                    {missionDetailList.missiondate.hasIconFlag ? (
                      <div
                        style={profPic(missionDetailList.missiondate.iconUrl)}
                      />
                    ) : null}
                    <div
                      className="detail-label"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.missiondate.label
                      }}
                    />
                    <div
                      className="detail-text"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.missiondate.text
                      }}
                    />
                    <div
                      className="detail-text-detail"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.missiondate.textDetail
                      }}
                    />
                    <div
                      className="detail-note"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.missiondate.textNote
                      }}
                    />
                    {missionDetailList.missiondate.hasLinkFlag ? (
                      <Link to={missionDetailList.missiondate.linkUrl}>
                        <span
                          className="link"
                          dangerouslySetInnerHTML={{
                            __html: missionDetailList.missiondate.linkLabel
                          }}
                        />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {missionDetailList.scheduledby ? (
                  <div className="info scheduledby" key={uniqueId()}>
                    {missionDetailList.scheduledby.hasIconFlag ? (
                      <div
                        style={profPic(missionDetailList.scheduledby.iconUrl)}
                      />
                    ) : null}
                    <div
                      className="detail-label"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.scheduledby.label
                      }}
                    />
                    <div
                      className="detail-text"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.scheduledby.text
                      }}
                    />
                    <div
                      className="detail-text-detail"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.scheduledby.textDetail
                      }}
                    />
                    <div
                      className="detail-note"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.scheduledby.textNote
                      }}
                    />
                    {missionDetailList.scheduledby.hasLinkFlag ? (
                      <Link to={missionDetailList.scheduledby.linkUrl}>
                        <span
                          className="link"
                          dangerouslySetInnerHTML={{
                            __html: missionDetailList.scheduledby.linkLabel
                          }}
                        />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {missionDetailList.observatory ? (
                  <div className="info" key={uniqueId()}>
                    {missionDetailList.observatory.hasIconFlag ? (
                      <div
                        style={profPic(missionDetailList.observatory.iconUrl)}
                      />
                    ) : null}
                    <div
                      className="detail-label"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.observatory.label
                      }}
                    />
                    <div
                      className="detail-text"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.observatory.text
                      }}
                    />
                    <div
                      className="detail-text-detail"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.observatory.textDetail
                      }}
                    />
                    <div
                      className="detail-note"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.observatory.textNote
                      }}
                    />
                    {missionDetailList.observatory.hasLinkFlag ? (
                      <Link to={missionDetailList.observatory.linkUrl}>
                        <span
                          className="link"
                          dangerouslySetInnerHTML={{
                            __html: missionDetailList.observatory.linkLabel
                          }}
                        />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {missionDetailList.telescope ? (
                  <div className="info" key={uniqueId()}>
                    {missionDetailList.telescope.hasIconFlag ? (
                      <div
                        style={profPic(missionDetailList.telescope.iconUrl)}
                      />
                    ) : null}
                    <div
                      className="detail-label"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.telescope.label
                      }}
                    />
                    <div
                      className="detail-text"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.telescope.text
                      }}
                    />
                    <div
                      className="detail-text-detail"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.telescope.textDetail
                      }}
                    />
                    <div
                      className="detail-note"
                      dangerouslySetInnerHTML={{
                        __html: missionDetailList.telescope.textNote
                      }}
                    />
                    {missionDetailList.telescope.hasLinkFlag ? (
                      <Link to={missionDetailList.telescope.linkUrl}>
                        <span
                          className="link"
                          dangerouslySetInnerHTML={{
                            __html: missionDetailList.telescope.linkLabel
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

          .container-detail-items {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
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
          @media all and (max-width: 640px) {
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
    );
  }
}

export default BootstrappedMissionDetailList;
