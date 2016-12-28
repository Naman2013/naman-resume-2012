import React, { Component, PropTypes } from 'react';
import PulsePostHeader from '../../components/pulse/pulse-post-header';

const list = {
  name: "The Moon",
  icon: "moon",
};

const PulsePost = ({ children }) =>

  <div className="clearfix pulse">

    <PulsePostHeader {...list} />

    {children}

  </div>;

export default PulsePost;

PulsePost.propTypes = {
  children: PropTypes.element.isRequired
};