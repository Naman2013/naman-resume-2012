import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'app/components/common/style/buttons/Button';
import img from './about-scope-temp.png';

export const AboutScope = () => {
  const pic = <img src={img} alt="About this scope" />;

  const desc = [
    { title: 'Telescope type', text: 'High-Magnification' },
    { title: 'Observatory', text: 'Canary Islands' },
    { title: 'Pier', text: 'Canary One' }
  ];

  const onClick = () => {};

  const btn = <Button onClickEvent={onClick} text="View our guide" />;

  const text = (
    <p className="text">
      Nam dapibus nisl lore vitae elit fringilla dolar rutrume lorei
      rutrume lorei massa sent Vesti seti lorem sollic
      iitudine lorem elem entum
      aenean lorem sollic iitudine lorem elementum rutrum
      doleil neeque lor sem pretiume metus quis mollis nisl
      nunc eter so massa sent Vesti seti lorem sollic
      iitudine lorem elem entum sem pretium metu.
    </p>
  );

  const article = (
    <article>
      <h4 className="h-4 text-uppercase">Slooh telescope</h4>
      <h1 className="h-1">Canary One</h1>
      {text}
      {text}
    </article>
  );

  return (
    <Container
      as="section"
      className="animated fadeIn faster top-bottom-40"
    >
      <Row noGutters className="shadow">
        <Col md={3}>
          <div className="i-box i-box-white-tile-paper">
            {pic}
            {desc.map(el => {
              return (
                <Fragment>
                  <div className="i-box i-box-inner-gap-20 pad-40">
                    <h4 className="h-4 text-uppercase">{el.title}</h4>
                    <p className="text">{el.text}</p>
                  </div>
                  <hr className="hr" />
                </Fragment>
              );
            })}
            <div className="i-box pad-40">{btn}</div>
          </div>
        </Col>

        <Col md={9} className="flex-col">
          <div className="i-box i-box-white">{article}</div>
        </Col>
      </Row>
    </Container>
  );
};
