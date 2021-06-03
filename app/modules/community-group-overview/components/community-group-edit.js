import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { Col, Row } from 'react-bootstrap';
import BackButton from 'app/atoms/BackButton';
import { Spinner } from 'app/components/spinner/index';
import { NavigationWithOptions } from 'app/components/NavigationWithOptions/NavigationWithOptions';
import TextareaField from 'app/components/form/TextareaField';
import './community-group-edit.scss';
import Btn from 'app/atoms/Btn';
import DiscussionBoardInviteNewMemberToSlooh from 'app/components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import { Modal } from 'app/components/modal';
import Button from 'app/components/common/style/buttons/Button';
import { CommunityGroupEditHeader } from './community-group-edit-header';
import { MemberCard } from './member-card';


class CommunityGroupEdit extends Component {
  state = { groupId: null, isDescriptionEditOn: false, isInviteOn: false };

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
      fetchGroupInvitationPanel,
      fetchGoogleClassroomStudentsPanel,
    } = this.props;

    fetchGroupOverviewPageMeta({ discussionGroupId: groupId }).then(() => {
      const {
        communityGroupOverview: {
          pageMeta: { isGoogleClassroom },
        },
      } = this.props;

      if (isGoogleClassroom) {
        fetchGoogleClassroomStudentsPanel(groupId);
      } else {
        fetchGroupInvitationPanel({discussionGroupId:groupId});
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { routeParams, fetching } = this.props;

    if (prevProps.routeParams.groupId !== routeParams.groupId) {
      refreshPage();

      if (!fetching) {
        const {
          change,
          communityGroupOverview: { description },
        } = this.props;
        change('groupDescription', description);
      }
    }
  }

  refreshPage = () => {
    const { groupId } = this.state;
    const {
      fetchGroupOverviewPageMeta,
      fetchGroupInvitationPanel,
      fetchGoogleClassroomStudentsPanel,
    } = this.props;
    fetchGroupOverviewPageMeta({ discussionGroupId: groupId }).then(() => {
      const {
        communityGroupOverview: {
          pageMeta: { isGoogleClassroom },
        },
      } = this.props;

      if (isGoogleClassroom) {
        fetchGoogleClassroomStudentsPanel(groupId);
      } else {
        fetchGroupInvitationPanel({discussionGroupId:groupId});
      }
    });
  };

  onInviteClick = () => {
    const {
      fetchInvitePopupContent,
      routeParams: { groupId },
    } = this.props;
    fetchInvitePopupContent(groupId);
    this.setState({ isInviteOn: true });
  };

  handleSubmit = value => {
    const {
      changeGroupDescription,
      routeParams: { groupId },
    } = this.props;
    changeGroupDescription({ ...value, groupId }).then(() =>
      this.setState({ isDescriptionEditOn: false })
    );
  };

  renderMembers = data => {
    console.log('data',data);
    const {
      addExistingUser,
      addGoogleUser,
      routeParams: { groupId },
      communityGroupOverview: {
        pageMeta: { isGoogleClassroom },
      },
    } = this.props;
    if (!data) return null;
    const { customerLinks } = data;
    return (
      customerLinks &&
      customerLinks.length &&
      customerLinks.map((member, index) => (
        <MemberCard
          member={member}
          key={`member-card-invitation-code-${index}`}
          refreshPage={this.refreshPage}
          onAddClick={() => {
            let user = {
              firstName: member.firstname,
              lastName: member.lastname,
              emailAddress: member.emailaddress,
            };
            if (!isGoogleClassroom) {
              addExistingUser(user, groupId).then(() => this.refreshPage());
            } else {
              user = { ...user, googleProfileId: member.googleprofileid };
              addGoogleUser(user, groupId).then(() => this.refreshPage());
            }
          }}
        />
      ))
    );
  };

  render() {
    const { renderMembers } = this;
    const {
      handleSubmit,
      routeParams: { groupId },
      invitePopupContent,
      isInvitePopupFetching,
      communityGroupOverview: {
        fetching,
        membersCount,
        descriptionHeading,
        groupInformation,
        description,
        pageMeta: { title, canEditGroup, subMenus },
      },
    } = this.props;

    
    console.log('kkkkkkkkkkkkkk',this.props);
    console.log('groupInformation',groupInformation);
    const { isDescriptionEditOn, isInviteOn } = this.state;
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
              onInviteClick={this.onInviteClick}
            />

            <div className="community-group-edit-section">
              <div className="i-root">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="i-box i-box-white pad-40 height-max">
                      <div className="community-group-edit-desc">
                        <h4 className="h-4">Club Overview</h4>
                        <div className="community-group-edit-row">
                          {!isDescriptionEditOn ? (
                            description && <p>{description}</p>
                          ) : (
                            <form onSubmit={handleSubmit(this.handleSubmit)}>
                              <Field
                                name="groupDescription"
                                component={TextareaField}
                              />
                              <div className="button-actions">
                                <Button
                                  type="button"
                                  text="Cancel"
                                  onClickEvent={() =>
                                    this.setState({
                                      isDescriptionEditOn: false,
                                    })
                                  }
                                />
                                <Button
                                  className="submit-button"
                                  type="submit"
                                  text="Save Changes"
                                />
                              </div>
                            </form>
                          )}
                          {!isDescriptionEditOn && (
                            <Btn
                              onClick={() =>
                                this.setState({ isDescriptionEditOn: true })
                              }
                              mod="circle"
                            >
                              <i className="fa fa-pencil" />
                            </Btn>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/*<Col lg={4} md={4} sm={4}>*/}
                  {/*  <div className="i-box i-box-white pad-40 height-max">*/}
                  {/*    <h4 className="h-4">Classroom gravity score</h4>*/}
                  {/*    <p className="community-group-edit-hero-unit">830K</p>*/}
                  {/*    <div className="community-group-edit-actions">*/}
                  {/*      <h5 className="h-5">Breakdown</h5>*/}
                  {/*      <h5 className="h-5 justify-content-center">Details</h5>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</Col>*/}
                </Row>
              </div>
            </div>

            <div className="i-root">
              <NavigationWithOptions navItems={subMenus} hideOptions />

              <div className="community-group-edit-header i-box i-box-white">
                <Row noGutters>
                  <Col lg={9} md={9} sm={9}>
                    <div className="flex-row justify-content-between align-items-center pad-20-40">
                      <h2 className="community-group-edit-title">
                        Your Members
                      </h2>
                      <p className="community-group-edit-hero-unit">
                        {groupInformation &&
                          groupInformation.customerLinksData &&
                          groupInformation.customerLinksData
                            .sectionHeading_LicenseInfo}
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
                      onClick={this.onInviteClick}
                      className="margin-auto width-140 justify-content-between"
                    >
                      Invite
                      <i className="fa fa-plus" />
                    </Btn>
                  </Col>
                </Row>
              </div>


              {renderMembers(groupInformation.customerLinksData)}
            </div>
            <Modal
              show={isInviteOn}
              onHide={() => this.setState({ isInviteOn: false })}
            >
              <DiscussionBoardInviteNewMemberToSlooh
                invitePopupContent={invitePopupContent}
                isFetching={isInvitePopupFetching}
                newInvitationComplete={() => {
                  this.setState({ isInviteOn: false });
                  const {
                    routeParams: { groupId },
                    fetchGroupInvitationPanel,
                    fetchGoogleClassroomStudentsPanel,
                    communityGroupOverview: {
                      pageMeta: { isGoogleClassroom },
                    },
                  } = this.props;

                  this.refreshPage();
                }}
                discussionGroupId={groupId}
              />
            </Modal>
          </div>
        )}
      </DeviceContext.Consumer>
    );
  }
}

export default reduxForm({
  form: 'editGroupDescriptionForm',
  enableReinitialize: true,
})(CommunityGroupEdit);
