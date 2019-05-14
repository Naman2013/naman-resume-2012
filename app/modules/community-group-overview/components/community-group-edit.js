import React, { Component } from 'react';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { Col, Row } from 'react-bootstrap';
import BackButton from 'app/atoms/BackButton';
import { Spinner } from 'app/components/spinner/index';
import { NavigationWithOptions } from 'app/components/NavigationWithOptions/NavigationWithOptions';
import './community-group-edit.scss';
import noop from 'lodash/fp/noop';
import Btn from 'app/atoms/Btn';
import { CommunityGroupEditHeader } from './community-group-edit-header';
import { MemberCard } from './member-card';

class CommunityGroupEdit extends Component {
  state = { groupId: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.routeParams.groupId !== prevState.groupId) {
      return { groupId: nextProps.routeParams.groupId };
    }
    return null;
  }

  componentDidMount() {
    const {
      routeParams: { groupId },
      fetchGroupOverviewPageMeta,
    } = this.props;

    fetchGroupOverviewPageMeta({ discussionGroupId: groupId });
  }

  componentDidUpdate(prevProps) {
    const {
      routeParams: { groupId },
      fetchGroupOverviewPageMeta,
    } = this.props;
    if (prevProps.routeParams.groupId !== groupId) {
      fetchGroupOverviewPageMeta({
        discussionGroupId: this.state.groupId,
      });
    }
  }

  renderMembers = membersList => {
    const { fetching } = this.props;
    return membersList && membersList.length ? (
      membersList.map(member => <MemberCard member={member} />)
    ) : (
      <Spinner loading={fetching} />
    );
  };

  render() {
    const { renderMembers } = this;
    const {
      changeGroupDescription,
      routeParams: { groupId },
      communityGroupOverview: {
        fetching,
        membersCount,
        descriptionHeading,
        description,
        membersList,
        pageMeta: { title, canEditGroup, subMenus },
      },
    } = this.props;
    if (fetching) return <Spinner loading={fetching} />;
    return (
      <DeviceContext.Consumer>
        {({ isMobile }) => (
          <div className="community-group-edit">
            <BackButton />
            <CommunityGroupEditHeader
              title={title}
              isMobile={isMobile}
              membersCount={membersCount}
              canEditGroup={canEditGroup}
              onChangeGroupDescription = {changeGroupDescription}
              groupId = {groupId}
            />

            <div className="community-group-edit-section shadow">
              <div className="i-root">
                <Row>
                  <Col lg={8} md={8} sm={8}>
                    <div className="i-box i-box-white pad-40 height-max">
                      <div className="community-group-edit-desc">
                        <h4 className="h-4">Classroom overview</h4>
                        <div className="community-group-edit-row">
                          {description && <p>{description}</p>}
                          <Btn onClick={noop} mod="circle">
                            <i className="fa fa-pencil" />
                          </Btn>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="i-box i-box-white pad-40 height-max">
                      <h4 className="h-4">Classroom gravity score</h4>
                      <p className="community-group-edit-hero-unit">830K</p>
                      <div className="community-group-edit-actions">
                        <h5 className="h-5">Breakdown</h5>
                        <h5 className="h-5 justify-content-center">Details</h5>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="i-root">
              <NavigationWithOptions navItems={subMenus} />

              <div className="community-group-edit-header i-box i-box-white">
                <Row noGutters>
                  <Col lg={9} md={9} sm={9}>
                    <div className="flex-row justify-content-between align-items-center pad-20-40">
                      <h2 className="community-group-edit-title">
                        Your Students
                      </h2>
                      <p className="community-group-edit-hero-unit">
                        {membersCount}
                      </p>
                    </div>
                  </Col>
                  <Col
                    lg={3}
                    md={3}
                    sm={3}
                    className="flex-row justify-content-between border-left"
                  >
                    <Btn
                      onClick={noop}
                      className="margin-auto width-140 justify-content-between"
                    >
                      Invite
                      <i className="fa fa-plus" />
                    </Btn>
                  </Col>
                </Row>
              </div>

              {renderMembers(membersList)}
            </div>
          </div>
        )}
      </DeviceContext.Consumer>
    );
  }
}

export { CommunityGroupEdit };
