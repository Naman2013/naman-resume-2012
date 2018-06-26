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
import { darkGray, lightGray, gray } from 'styles/variables/colors';
import { secondaryFont } from 'styles/variables/fonts';

const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

class BootstrappedMissionDetailList extends Component {
  static propTypes = {
    device: string,
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

  static defaultProps = {
    device: string,
    listTitle: '',
    imagingDetailList: {
      humidity: {},
      seeingconditions: {},
      wind: {},
    },
  };

  state = {
    showInfo: this.props.device !== 'desktop',
  };

  toggleInfo = (e) => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo,
    }));
  }


  render() {
    const {
      device,
      listTitle,
      imagingDetailList,
    } = this.props;
    const { showInfo } = this.state;
    const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
      height: '50px',
      width: '50px',
      backgroundSize: 'cover',
    });

    return (<div className={classnames({
      'component-container': device === 'desktop',
      })}>
      {device === 'desktop' ? <div className="title-container">
        <span className="title" dangerouslySetInnerHTML={{ __html: listTitle}} />
        <img
          className={classnames('action', {
            up: showInfo,
          })}
          onClick={this.toggleInfo}
          src="https://vega.slooh.com/assets/v4/common/arrow_down.svg"
        />
      </div> : null}

      {showInfo ? <div className="container-detail-items">
        {device !== 'desktop' ? <div className="title" dangerouslySetInnerHTML={{ __html: listTitle}} /> : null}
        <div className={classnames('detail-items', {
          'component-container': device !== 'desktop',
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
      </div> : null}
      <style jsx>{`

        .component-container {
          margin: 25px;
          -moz-box-shadow: 0 2px 4px 1px ${gray};
          -webkit-box-shadow: 0 2px 4px 1px ${gray};
          box-shadow: 0 2px 4px 1px ${gray};
        }

        .title-container {
          text-transform: uppercase;
          color: ${darkGray};
          font-weight: bold;
          font-size: 12px;
          border-bottom: 4px solid ${darkGray};
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .title {
          padding: 25px;
          text-align: center;
          width: 85%;
        }

        .info {
          padding: 25px;
        }

        .up {
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          transform: rotate(180deg);
        }

        .detail-items {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
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
        .info {
          flex: 0 100%;
          padding: 25px;
          border: 1px solid ${gray};
        }

        .detail-note,
        .link {
          font-family: ${secondaryFont};
          font-size: 12px;
          color: ${lightGray};
          font-style: italic;
        }

        .container-detail-items {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }

        @media all and (min-width: 641px) and (max-width: 768px) {
          .container-detail-items {
            flex-direction: row;
          }

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
          .container-detail-items {
            flex-direction: row;
          }

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
    </div>);
  }
}

export default BootstrappedMissionDetailList;
