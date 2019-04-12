import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import { Desktop, Tablet, Mobile } from 'app/components/common/Responsive';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';

export const AboutScope = props => {
  const {
    teleName,
    obsShortName,
    obsHeroURL,
    obsDescription,
    instrAbout,
    instrRelatedGuideUrl,
  } = props;
  if (!teleName) return null;

  const pic = (
    <div className="i-image">
      <img src={obsHeroURL} alt={teleName} />
    </div>
  );

  const desc = [
    { id: '1', title: 'Telescope type', text: 'High-Magnification' },
    { id: '2', title: 'Observatory', text: obsShortName },
    { id: '3', title: 'Pier', text: teleName },
  ];

  const preTitle = <h4 className="h-4 text-uppercase">Slooh telescope</h4>;

  const mainTitle = <h1 className="h-1">{teleName}</h1>;

  const onViewGuideClick = () => browserHistory.push(instrRelatedGuideUrl);

  const description = desc.map(el => {
    return (
      <Fragment key={el.id}>
        <div className="inner-gap-20 pad-40">
          <h4 className="h-4 text-uppercase">{el.title}</h4>
          <p className="i-text top-bot-10">{el.text}</p>
        </div>
        <hr className="hr" />
      </Fragment>
    );
  });

  const renderTelescope = () => {
    return (
      <Fragment>
        {pic}
        <div className="pad-40 no-bottom-pad">{mainTitle}</div>
        <div className="pad-40 btn-group">
          <Btn onClick={() => onViewGuideClick()}>View guide</Btn>
          <Btn mod="circle">
            <Icon i="plus" />
          </Btn>
          <Btn mod="circle">
            <Icon i="info" />
          </Btn>
        </div>
      </Fragment>
    );
  };

  const renderMobile = () => {
    return (
      <Fragment>
        <Col sm={12} className="i-box-white">
          {renderTelescope()}
        </Col>
      </Fragment>
    );
  };

  const renderTablet = () => {
    return (
      <Fragment>
        <Col sm={6} className="i-box-white">
          {renderTelescope()}
        </Col>

        <Col md={6} className="i-box-white-tile-paper no-last-border">
          {description}
        </Col>
      </Fragment>
    );
  };

  const renderDesktop = () => {
    return (
      <Fragment>
        <Col lg={4} className="i-box-white-tile-paper">
          {pic}
          {description}
          <div className="pad-40 btn-group">
            <Btn onClick={() => onViewGuideClick()}>View our guide</Btn>
          </div>
        </Col>

        <Col lg={8} className="i-box-white">
          <article className="pad-100">
            {preTitle}
            {mainTitle}
            <article>
              <div className="i-text">
                <p className="text">{obsDescription}</p>
                <p className="text">{instrAbout}</p>
              </div>
            </article>
          </article>
        </Col>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Container as="section" className="animated fadeIn faster top-bot-40">
        <Row noGutters className="shadow">
          <Desktop>{renderDesktop()}</Desktop>
          <Tablet>{renderTablet()}</Tablet>
          <Mobile>{renderMobile()}</Mobile>
        </Row>
      </Container>
      <section className="i-box-blue-tile pad-100">
        <div className="wrap wrap-850">
          <header className="head">
            <h2 className="h-2 h-2-bold h-2-white h-2-primary">
              Featured observations
            </h2>
            <p className="i-text i-text-18 i-text-white">
              Community Observations
            </p>
          </header>
          <RecommendedObservations />
        </div>
      </section>
    </Fragment>
  );
};
