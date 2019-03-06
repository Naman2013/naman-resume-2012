import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import uniqueId from 'lodash/uniqueId';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import { Desktop, Tablet, Mobile } from 'app/components/common/Responsive';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import img from './about-scope-temp.png';

export const CardObsContext = React.createContext({});

export const AboutScope = () => {
  const pic = (
    <div className="image">
      <img src={img} alt="About this scope" />
    </div>
  );

  const desc = [
    { title: 'Telescope type', text: 'High-Magnification' },
    { title: 'Observatory', text: 'Canary Islands' },
    { title: 'Pier', text: 'Canary One' },
  ];

  const text = (
    <p className="i-text">
      Nam dapibus nisl lore vitae elit fringilla dolar rutrume lorei rutrume
      lorei massa sent Vesti seti lorem sollic iitudine lorem elem entum aenean
      lorem sollic iitudine lorem elementum rutrum doleil neeque lor sem
      pretiume metus quis mollis nisl nunc eter so massa sent Vesti seti lorem
      sollic iitudine lorem elem entum sem pretium metu.
    </p>
  );

  const preTitle = <h4 className="h-4 text-uppercase">Slooh telescope</h4>;

  const mainTitle = <h1 className="h-1">Canary One</h1>;

  const article = (
    <Fragment>
      {text} {text}
    </Fragment>
  );

  const description = desc.map(el => {
    return (
      <Fragment key={uniqueId()}>
        <div className="inner-gap-20 pad-40">
          <h4 className="h-4 text-uppercase">{el.title}</h4>
          <p className="i-text">{el.text}</p>
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
          <Btn>View guide</Btn>
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
            <Btn>View our guide</Btn>
            <Btn mod="circle">
              <Icon i="ellipsis-h" />
            </Btn>
          </div>
        </Col>

        <Col lg={8} className="i-box-white">
          <article>
            {preTitle}
            {mainTitle}
            {article}
          </article>
        </Col>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Container as="section" className="animated fadeIn faster top-bottom-40">
        <Row noGutters className="shadow">
          <Desktop>{renderDesktop()}</Desktop>
          <Tablet>{renderTablet()}</Tablet>
          <Mobile>{renderMobile()}</Mobile>
        </Row>
      </Container>
      <section className="i-box-blue-tile pad-100">
        <div className="wrap wrap-850">
          <header className="head">
            <h2 className="h-2 h-2-bold h-2-white h-2-primary text-uppercase">
              Featured observations
            </h2>
            <p className="i-text i-text-18 i-text-white">
              Community Observations
            </p>
          </header>
          <CardObsContext.Provider value="small">
            <RecommendedObservations />
          </CardObsContext.Provider>
        </div>
      </section>
    </Fragment>
  );
};
