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
import uniqueId from 'lodash/uniqueId';
import BlueLineDrop from 'components/common/BlueLineDrop';
import ShowMoreFullSet from 'components/common/ShowMoreFullSet';
import MembersListSort from './members-list-sort';
import MembersCardList from './members-list-card-list';
import {
  profPic,
} from '../styles';
import styles from './members-list.style';

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
    fetchGroupMembers: func.isRequired,
    membersCount: number.isRequired,
    membersList: arrayOf(shape({})).isRequired,
    count: number,
  }

  static defaultProps = {
    count: 5,
  }

  state = {
    displayedMembers: [],
    members: [],
    page: 1,
  }

  componentDidMount() {
    const { membersList, count } = this.props;
    const displayedMembers = take([].concat(membersList), count)
      .map(member => member.customerId);
      this.setState({
        displayedMembers,
        members: membersList,
      });
  }

  componentWillReceiveProps(nextProps) {
    const { count, membersList, membersSort } = this.props;
    if (membersList.length !== nextProps.membersList.length || (membersSort !== nextProps.membersSort)) {
      const displayedMembers = take([].concat(nextProps.membersList), nextProps.count)
        .map(member => member.customerId);
        this.setState({
          displayedMembers,
          members: nextProps.membersList,
        });
    }
  }

  get displayedMembersObjs() {
    const { displayedMembers, members } = this.state;
    return [].concat(members).filter(member => displayedMembers.indexOf(member.customerId) > -1);
  }

  handleShowMore = (paginatedSet, page) => {
    this.setState({
      displayedMembers: paginatedSet,
      page,
    });
  }

  render() {
    const {
      isDesktop,
      membersCount,
      membersList,
      membersSort,
      count,
      discussionGroupId,
      fetchGroupMembers,
      renderToggle,
    } = this.props;

    const {
      members,
      displayedMembers,
      page,
    } = this.state;

    return (
      <div className="members-list">
        <BlueLineDrop
          title={`Group Members (${membersCount})`}
          isDesktop={isDesktop}
          render={() => (
            <div className="members-container">
              <MembersListSort
                membersSort={membersSort}
                discussionGroupId={discussionGroupId}
                renderList={() => <MembersCardList list={this.displayedMembersObjs} />}
                fetchGroupMembers={fetchGroupMembers}
              />
              <div className="button-container">
                {this.displayedMembersObjs.length > 0 && <ShowMoreFullSet
                  handleShowMore={this.handleShowMore}
                  fullDataSet={members}
                  count={count}
                  totalCount={members.length}
                  page={page}
                  idField="customerId"
                  buttonText="More Members"
                />}
                {renderToggle ? renderToggle() : null}
              </div>
            </div>)}
        />

        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default GroupMemberList;
