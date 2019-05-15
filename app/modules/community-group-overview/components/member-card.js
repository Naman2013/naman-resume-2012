// @flow
import React, { useState } from 'react';
import Btn from 'app/atoms/Btn';
import './member-card.scss';
import { Col, Row } from 'react-bootstrap';
import noop from 'lodash/fp/noop';

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
  },
};

const MemberCard = (props: TMemberCard) => {
  const [isOpen, toggleCard] = useState(false);
  const {
    member: {
      status,
      name,
      publicProfileLinkUrl,
      invitationcode,
      emailaddress,
      lastactivity,
    },
  } = props;
  return (
    <div className="member-card i-box i-box-white">
      <Row noGutters className="member-card-row">
        <Col
          lg={10}
          md={10}
          sm={10}
          className="member-card-col member-card-col-bordered"
        >
          <h2 className="community-group-edit-title">{name}</h2>
          <h4 className="h-4 h-4-bold">{status}</h4>
        </Col>
        <Col
          lg={2}
          md={2}
          sm={2}
          className="member-card-col member-card-col-centered"
        >
          {isOpen ? (
            <Btn mod="circle" onClick={() => toggleCard(false)}>
              <i className="fa fa-close" />
            </Btn>
          ) : (
            <Btn mod="circle" onClick={() => toggleCard(true)}>
              <i className="fa fa-info" />
            </Btn>
          )}
          <Btn mod="circle" onClick={noop}>
            <i className="fa fa-ellipsis-h" />
          </Btn>
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
            <p>{invitationcode}</p>
          </Col>
          <Col
            lg={7}
            md={7}
            sm={7}
            className="member-card-col member-card-col-pad border-left"
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
            className="member-card-col member-card-col-start member-card-col-pad border-left"
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
            <div className="member-card-col">
              <Btn onClick={noop}>Rescind</Btn>
              <Btn onClick={noop}>Remind</Btn>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export { MemberCard };
