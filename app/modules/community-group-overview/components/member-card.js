// @flow
import React, { useState } from 'react';
import Btn from 'app/atoms/Btn';
import './member-card.scss';
import { Col, Row } from 'react-bootstrap';
import { MissionPhotosCard } from 'app/modules/clubs/components/delete-invitation-modal';

type TMemberCard = {
  member: {
    status: string,
    clubStatus: string,
    showInvitationCode: boolean,
    showClubStatus: boolean,
    showAddButton: boolean,
    publicProfileLinkUrl: string,
    name: string,
    lastname: string,
    firstname: string,
    emailaddress: string,
    lastactivity: string | Date,
    invitationcode: string | number,
    invitationPrompt: string,
    showInvitationCode: boolean,
    showAddButton: boolean,
    invitationPrompt: string,
  },
};

const openInvitationModal = (
  setDeleteOpen,
  deleteInvitationFromGroup,
  member,
  setDeleteInvitationResponse
) => {
  deleteInvitationFromGroup(member).then(response => {
    const deleteInvitationResponse = {
      pageHeading1: response.pageHeading1,
      pageHeading2: response.pageHeading2,
      canDeleteInvitation: response.canDeleteInvitation,
      confirmationText: response.confirmationText,
      confirmButtonText: response.confirmButtonText,
      cancelButtonText: response.cancelButtonText,
      gravityEarnedInThisRequest: response.gravityEarnedInThisRequest,
    };
    setDeleteInvitationResponse(deleteInvitationResponse);
    setDeleteOpen(true);
  });
};

const MemberCard = (props: TMemberCard) => {
  const [isOpen, toggleCard] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteInvitationResponse, setDeleteInvitationResponse] = useState({});

  const {
    onAddClick,
    member,
    member: {
      status,
      name,
      invitationcode,
      emailaddress,
      lastactivity,
      showInvitationCode,
      showAddButton,
      invitationPrompt,
      canDeleteInvitation,
    },
    deleteInvitationFromGroup,
    deleteInvitation,
  } = props;

  return (
    <div className="member-card i-box i-box-white">
      <Row noGutters className="member-card-row">
        <Col
          lg={8}
          md={6}
          sm={6}
          className="member-card-col member-card-col-pad border-right"
        >
          <h2 className="community-group-edit-title">{name}</h2>
          <h4 className="h-4 h-4-bold">{status}</h4>
        </Col>
        <Col
          lg={4}
          md={6}
          sm={6}
          className="member-card-col member-card-col-centered"
        >
          {canDeleteInvitation && (
            <div>
              <div
                className="delete-invitation-btn"
                onClick={() => {
                  openInvitationModal(
                    setDeleteOpen,
                    deleteInvitationFromGroup,
                    member,
                    setDeleteInvitationResponse
                  );
                }}
              >
                <span className="icon-delete" />
              </div>
              {isDeleteOpen && (
                <MissionPhotosCard
                  show
                  onHide={() => {
                    setDeleteOpen(false);
                  }}
                  deleteInvitationResponse={deleteInvitationResponse}
                  deleteInvitation={() => {
                    deleteInvitation(member);
                  }}
                />
              )}
            </div>
          )}
          {isOpen ? (
            <Btn mod="circle" onClick={() => toggleCard(false)}>
              <i className="fa fa-close" />
            </Btn>
          ) : (
            <Btn mod="circle" onClick={() => toggleCard(true)}>
              <i className="fa fa-info" />
            </Btn>
          )}
          {showAddButton && <Btn onClick={onAddClick}>{invitationPrompt}</Btn>}
        </Col>
      </Row>

      {isOpen && status === 'Active' && (
        <Row noGutters className="member-card-row border-top">
          <Col
            lg={2}
            md={2}
            sm={2}
            className="member-card-col member-card-col-start member-card-col-pad"
          >
            <h4 className="h-4">Invitation code:</h4>
            <p>{!showInvitationCode ? 'n/a' : invitationcode}</p>
          </Col>
          <Col
            lg={7}
            md={7}
            sm={7}
            className="member-card-col member-card-col-pad border-left border-right"
          >
            <div>
              <h4 className="h-4">Email:</h4>
              <p>{emailaddress}</p>
            </div>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={3}
            className="member-card-col member-card-col-start member-card-col-pad"
          >
            <h4 className="h-4">Last Activity:</h4>
            <p>{lastactivity}</p>
          </Col>
        </Row>
      )}

      {isOpen && status === 'Invitation Sent' && (
        <Row noGutters className="member-card-row border-top">
          <Col
            lg={2}
            md={2}
            sm={2}
            className="member-card-col member-card-col-start member-card-col-pad"
          >
            <h4 className="h-4">Invitation code:</h4>
            <p>{invitationcode}</p>
          </Col>
          <Col
            lg={10}
            md={10}
            sm={10}
            className="member-card-col member-card-col-pad border-left"
          >
            <div>
              <h4 className="h-4">Email:</h4>
              <p>{emailaddress}</p>
            </div>
            {/*<div className="member-card-col">*/}
            {/*  <Btn onClick={noop}>Rescind</Btn>*/}
            {/*  <Btn onClick={noop}>Remind</Btn>*/}
            {/*</div>*/}
          </Col>
        </Row>
      )}
    </div>
  );
};

export { MemberCard };
