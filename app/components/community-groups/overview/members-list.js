/***********************************
 * V4 Community Groups Member list Component
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router';
import take from 'lodash/take';
import uniqueId from 'lodash/uniqueId';
import BlueLineDrop from 'app/components/common/BlueLineDrop';
import ShowMoreFullSet from 'app/components/common/ShowMoreFullSet';
import MembersListSort from './members-list-sort';
import MembersCardList from './members-list-card-list';
import MemberListCard from './members-list-card';
import { profPic } from '../styles';
import styles from './members-list.style';

const { arrayOf, bool, func, number, shape, string } = PropTypes;
@withTranslation()
class GroupMemberList extends Component {
  static propTypes = {
    fetchGroupMembers: func.isRequired,
    membersCount: number.isRequired,
    membersList: arrayOf(shape({})).isRequired,
    count: number,
  };

  static defaultProps = {
    count: 5,
  };

  state = {
    displayedMembers: [],
    members: [],
    page: 1,
  };

  componentDidMount() {
    const { membersList, count } = this.props;
    const displayedMembers = take([].concat(membersList), count).map(
      member => member.customerId
    );
    this.setState({
      displayedMembers,
      members: membersList,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { count, membersList, membersSort } = this.props;
    if (
      membersList.length !== nextProps.membersList.length ||
      membersSort !== nextProps.membersSort
    ) {
      const displayedMembers = take(
        [].concat(nextProps.membersList),
        nextProps.count
      ).map(member => member.customerId);
      this.setState({
        displayedMembers,
        members: nextProps.membersList,
      });
    }
  }

  get displayedMembersObjs() {
    const { displayedMembers, members } = this.state;
    return []
      .concat(members)
      .filter(member => displayedMembers.indexOf(member.customerId) > -1);
  }

  handleShowMore = (paginatedSet, page) => {
    this.setState({
      displayedMembers: paginatedSet,
      page,
    });
  };

  render() {
    const {
      isDesktop,
      membersCount,
      membersList,
      leadersList,
      membersSort,
      count,
      discussionGroupId,
      fetchGroupMembers,
      renderToggle,
      theme,
      t,
    } = this.props;

    const { members, displayedMembers, page } = this.state;

    return (
      <div className="members-list" style={theme}>
        <div className="members-container">
          <div>
            {leadersList && leadersList.map(x => <MemberListCard {...x} />)}

          </div>
        </div>
        {/*  <BlueLineDrop
          //title={t('Clubs.GroupMembers', { membersCount })}
          title={t('Club Leaders')}
          isDesktop={isDesktop}
          render={() => (
            <>
              <MembersListSort
                membersSort={membersSort}
                discussionGroupId={discussionGroupId}
                renderList={() => (
                  <MembersCardList list={this.displayedMembersObjs} />
                )}
                fetchGroupMembers={fetchGroupMembers}
              />
              <div className="button-container">
                {this.displayedMembersObjs.length > 0 && (
                  <ShowMoreFullSet
                    handleShowMore={this.handleShowMore}
                    fullDataSet={members}
                    count={count}
                    totalCount={members.length}
                    page={page}
                    idField="customerId"
                    buttonText={[t('Clubs.MoreMember'), t('Clubs.MoreMembers')]}
                  />
                )}
                {renderToggle ? renderToggle() : null}
              </div>
            </>
          )}
        /> */}

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default GroupMemberList;
