// @flow
import React, { useEffect, useState } from 'react';
import Btn from 'app/atoms/Btn';
import './member-card.scss';
import { Col, Row } from 'react-bootstrap';
import DeleteInvitationModal from 'app/modules/clubs/containers/deleteInvitationModal';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import Modal from 'react-modal';

type TMemberCard = {
  member: {
    status: string,
    clubStatus: string,
    showInvitationCode: boolean,
    showClubStatus: boolean,
    publicProfileLinkUrl: string,
    name: string,
    lastname: string,
    firstname: string,
    emailaddress: string,
    lastactivity: string | Date,
    invitationcode: string | number,
    invitationPrompt: string,
    showAddButton: boolean,
    invitationPrompt: string,
  },
  refreshPage: Function,
};

const MemberCard = (props: TMemberCard) => {
  const [isOpen, toggleCard] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [invitationIsDeleted, setInvitationIsDeleted] = useState(null);
  const [deletedInvitationData, setDeleteExplanationMessage] = useState('');

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
    refreshPage,
  } = props;

  const setDeleteInvitationModal = responceStatusMessage => {
    if (responceStatusMessage) {
      setDeleteExplanationMessage(responceStatusMessage);
      setInvitationIsDeleted(true);
      setTimeout(() => {
        setInvitationIsDeleted(false);
        refreshPage();
      }, 3000);
    }
    setDeleteOpen(false);
  };

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
                onClick={() => setDeleteOpen(true)}
              >
                <span className="icon-delete" />
              </div>
              {isDeleteOpen && (
                <DeleteInvitationModal
                  show
                  onHide={invitationDeleted =>
                    setDeleteInvitationModal(invitationDeleted)
                  }
                  member={member}
                />
              )}
              {invitationIsDeleted && (
                <Modal
                  ariaHideApp={false}
                  isOpen
                  style={customModalStylesBlackOverlay}
                  contentLabel="Like"
                  onRequestClose={() => {}}
                >
                  <i
                    className="fa fa-close"
                    onClick={() => setInvitationIsDeleted(false)}
                  />
                  <p>{deletedInvitationData}</p>
                </Modal>
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
          </Col>
        </Row>
      )}
    </div>
  );
};

export { MemberCard };
