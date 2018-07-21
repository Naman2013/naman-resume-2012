/***********************************
* V4 Community Groups Member list Component
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import take from 'lodash/take';
import {
  fullWidthBtn,
  profPic,
} from '../styles';
import { dropShadowContainer } from 'styles/mixins/utilities';


const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class GroupMemberList extends Component {
  static propTypes = {
    membersCount: number.isRequired,
    membersList: arrayOf(shape({})).isRequired,
  }

  static defaultProps = {}

  state = {
    displayedNumber: 8,
    showingAll: false,
  }

  toggleSeeAll = (e) => {
    e.preventDefault();
    const { membersCount } = this.props;
    const { showingAll } = this.state;
    const displayedNumber = showingAll ? 8 : membersCount;
    this.setState({
      displayedNumber,
      showingAll: !showingAll,
    });
  }

  render() {
    const {
      membersCount,
      membersList,
    } = this.props;

    const {
      displayedNumber,
    } = this.state;

    return (
      <div className="members-list">
        Group Members
        <div className="members-container">
          <h5>Group Members: {membersCount}</h5>
          <div className="img-container">
            {take(membersList, displayedNumber).map((member) => {
              const avatarStyle = Object.assign(profPic(member.iconUrl), {
                height: '50px',
                width: '50px',
                display: 'inline-block',
                padding: '5px',
                cursor: 'pointer',
              });
              return (<div key={199637} className="avatar-img">
                {member.hasLink ? <Link to={member.linkUrl}>
                  <div style={avatarStyle} />
                </Link> : <img src={member.iconUrl} />}
              </div>)
            })}
          </div>
          <button onClick={this.toggleSeeAll} className="see-all">{this.state.showingAll ? 'See Less' : 'See All'}</button>
        </div>
        <style jsx>{`
          .members-list {
            min-width: 350px;
            padding: 15px;
          }
          .members-container {
            ${dropShadowContainer}
          }

          .img-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .avatar-img {
            margin: 5px;
          }

          .see-all {
            ${fullWidthBtn}
          }
        `}</style>
      </div>
    )
  }
}

export default GroupMemberList;
