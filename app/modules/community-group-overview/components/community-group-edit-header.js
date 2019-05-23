// @flow
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import cn from 'classnames';
import './community-group-edit-header.scss';

type TGroupOverviewHeader = {
  isMobile: boolean,
  title: string,
  canEditGroup: boolean,
  membersCount: number | string,
  onInviteClick: Function,
};

const CommunityGroupEditHeader = (props: TGroupOverviewHeader) => {
  const { isMobile, title, membersCount, onInviteClick } = props;
  return (
    <header className="details i-box-white ">
      <div className="i-root">
        <Row noGutters>
          <Col lg={12} md={12} sm={12}>
            <h1 className="h-1 h-1-low h-1-lowercase details-head">
              <span>{title}</span>
            </h1>
          </Col>
        </Row>
        <hr className="hr" />
        <Row noGutters className="details-box">
          <Col lg={3} md={3} sm={12}>
            <h5 className="h-5 h-5-normal font-weight-bold">Description</h5>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <h5
              className={cn('h-5 h-5-normal details-ceil font-weight-bold', {
                'details-ceil-mobile font-weight-bold': isMobile,
              })}
            >
              {membersCount} member{membersCount > 1 && 's'}
            </h5>
          </Col>
          <Col lg={5} md={5} sm={12}>
            <div
              className={`btn-group justify-content-${
                isMobile ? 'start' : 'end'
              }`}
            >
              <Btn onClick={onInviteClick}>
                Invite
                <i className="fa fa-plus" />
              </Btn>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export { CommunityGroupEditHeader };
