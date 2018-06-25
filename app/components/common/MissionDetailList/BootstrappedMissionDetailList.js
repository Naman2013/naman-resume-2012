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
import { darkGray, lightGray } from 'styles/variables/colors';
import { secondaryFont } from 'styles/variables/fonts';


const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

class BootstrappedMissionDetailList extends Component {
  static propTypes = {
    listTitle: string,
    missionDetailList: arrayOf(shape({
      hasIconFlag: bool,
      hasLinkFlag: bool,
      iconUrl: string,
      label: string,
      linkLabel: string,
      linkUrl: string,
      text: string,
      textDetail: string,
      textNote: string,
    })),
  }

  static defaultProps = {
    listTitle: '',
    missionDetailList: [],
  };

  state = {
    showInfo: false,
  };

  toggleInfo = (e) => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo,
    }));
  }



  render() {
    const {
      listTitle,
      missionDetailList,
    } = this.props;
    const { showInfo } = this.state;
    const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
      height: '50px',
      width: '50px',
      backgroundSize: 'cover',
    });

    return (<div className="root">
      <div className="title-container">
        <span className="title" dangerouslySetInnerHTML={{ __html: listTitle}} />
        {showInfo ? <img className={classnames('action', {
          up: showInfo,
        })} onClick={this.toggleInfo} src="https://vega.slooh.com/assets/v4/common/arrow_down.svg" /> :
        <div className="action fa fa-plus" onClick={this.toggleInfo} />}
      </div>
      {showInfo ? missionDetailList.map(detail => (<div className="info" key={uniqueId()}>
        {detail.hasIconFlag ? <div style={profPic(detail.iconUrl)} /> : null}
        <div className="detail-label" dangerouslySetInnerHTML={{ __html: detail.label}} />
        <div className="detail-text" dangerouslySetInnerHTML={{ __html: detail.text}} />
        <div className="detail-text-detail" dangerouslySetInnerHTML={{ __html: detail.textDetail}} />
        <div className="detail-note" dangerouslySetInnerHTML={{ __html: detail.textNote}} />
        {detail.hasLinkFlag ?
          <Link to={detail.linkUrl}>
            <span className="link" dangerouslySetInnerHTML={{ __html: detail.linkLabel}}/>
          </Link> : null}
      </div>)) : null}
      <style jsx>{`

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
        }

        .info {
          padding: 25px;
        }

        .up {
          -webkit-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
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
        .detail-note,
        .link {
          font-family: ${secondaryFont};
          font-size: 12px;
          color: ${lightGray};
          font-style: italic;
        }
      `}</style>
    </div>);
  }
}

export default BootstrappedMissionDetailList;
