// @flow
import React, { useState } from 'react';
import Btn from 'app/atoms/Btn';
import './member-card.scss';
import { Col, Row } from 'react-bootstrap';
import noop from 'lodash/fp/noop';

type TMemberCard = {
  member: {
    // These fields are present
    customerId: number,
    displayName: string,
    gravity: number,
    gravityLabel: string,
    hasLink: boolean,
    iconUrl: string,
    isModerator: boolean,
    isMonitor: boolean,
    linkUrl: string,

    // Next fields are needed
    status: string | boolean, // 'awaiting', 'active' | false, true
    inviteCode: number | string,
    email: string,
    lastActivity: string | Date,
  },
};

const MemberCard = (props: TMemberCard) => {
  // const [isOpen, toggleCard] = useState(false);
  const { member } = props;
  return (
    <div className="member-card i-box i-box-white">
      <Row noGutters className="member-card-row">
        <Col
          lg={1}
          md={1}
          sm={1}
          className="member-card-col member-card-col-centered"
        >
          <div className="member-card-img">
            <img src={member.iconUrl} alt="" />
          </div>
        </Col>
        <Col
          lg={9}
          md={9}
          sm={9}
          className="member-card-col member-card-col-bordered"
        >
          <h2 className="community-group-edit-title">{member.displayName}</h2>
          <h4 className="h-4 h-4-bold">Active</h4>
        </Col>
        <Col
          lg={2}
          md={2}
          sm={2}
          className="member-card-col member-card-col-centered"
        >
          <Btn mod="circle" onClick={noop}>
            <i className="fa fa-info" />
          </Btn>
          <Btn mod="circle" onClick={noop}>
            <i className="fa fa-ellipsis-h" />
          </Btn>
        </Col>
      </Row>

      <Row noGutters className="member-card-row-low border-top">
        <Col
          lg={2}
          md={2}
          sm={2}
          className="member-card-col member-card-col-start member-card-col-pad"
        >
          <h4 className="h-4">Invite code:</h4>
          <p>11983457938</p>
        </Col>
        <Col
          lg={10}
          md={10}
          sm={10}
          className="member-card-col member-card-col-pad border-left"
        >
          <div>
            <h4 className="h-4">Email:</h4>
            <p>johnsnow@gmail.com</p>
          </div>
          <div className="member-card-col">
            <Btn onClick={noop}>Rescind</Btn>
            <Btn onClick={noop}>Remind</Btn>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { MemberCard };
