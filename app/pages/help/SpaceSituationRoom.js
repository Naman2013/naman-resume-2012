import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const Community = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Space Situation Room</h1>
      <Link to="/about/contact" className="button btn-primary help-page-button">
        Contact Us
      </Link>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph">Our team of astronomers monitor the happenings in space from the Space Situation Room at Slooh HQ, which you will find percolating with activity on a daily basis. With over 30 telescopes in the network and partners all over the world, we are able to share every interesting celestial moment with you via live video, including fully produced shows featuring Slooh Astronomers and expert guests as well as daily telescope feeds of space. We have journeyed with a mobile observatory to Kenya, the Faroe Islands, Indonesia, Iceland, Australia, and Alaska, and partnered with observatories in Arizona, Japan, Hawaii, Cypress, Dubai, South Africa, Australia, New Zealand, Norway and many more to livestream celestial events of potentially hazardous asteroids (PHAs), comets, transits, eclipses, solar activity, auroras and more. Come celebrate the Transcontinental Eclipse, a Total Solar Eclipse on August 21st, 2017 in Stanley, Idaho, with Slooh as we host a three day cultural festival for members.</div>
      </div>
    </div>
  </div>
);

export default Community;
