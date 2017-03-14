import React, { Component, PropTypes, cloneElement } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import DiscussionsHeader from '../../components/discussions/DiscussionsHeader';

const { func, object, string } = PropTypes;
const Discussions = ({ children }) => (
  <div className="clearfix">
    <AnnouncementBanner />
    <DiscussionsHeader />
    <section>
      {cloneElement(children)}
    </section>
  </div>
);

Discussions.propTypes = {
  children: object,
}

Discussions.defaultProps = {
  children: {},
}

export default Discussions;
