/***********************************
* V4 Mission Detail List populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { profilePhotoStyle } from 'styles/mixins/utilities';


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
  };


  render() {
    const {
      listTitle,
      missionDetailList,
    } = this.props;

    const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
      height: '50px',
      width: '50px',
      backgroundSize: 'cover',
    });

    return (<div className="root">
      <h3 dangerouslySetInnerHTML={{ __html: listTitle}} />
      {missionDetailList.map(detail => (<div>
        {detail.hasIconFlag ? <div style={profPic(detail.iconUrl)}/> : null}
        <div dangerouslySetInnerHTML={{ __html: detail.label}} />
        <div dangerouslySetInnerHTML={{ __html: detail.text}} />
        <div dangerouslySetInnerHTML={{ __html: detail.textDetail}} />
        <div dangerouslySetInnerHTML={{ __html: detail.textNote}} />
        {detail.hasLinkFlag ?
          <Link to={detail.linkUrl}>
            <span dangerouslySetInnerHTML={{ __html: detail.linkLabel}}/>
          </Link> : null}
      </div>))}
      <style jsx>{`
      `}</style>
    </div>);
  }
}

export default BootstrappedMissionDetailList;
