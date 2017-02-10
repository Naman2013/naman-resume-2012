import React, { Component, PropTypes, cloneElement } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import DiscussionsHeader from '../../components/discussions/DiscussionsHeader';

const { object } = PropTypes;

const Discussions = ({ children, params }) => {
  const { topicId } = params;

  return (<div className="clearfix">
    <AnnouncementBanner />
    <DiscussionsHeader title={topicId && 'Forum Name: Topic Name'}/>
    <section>
      {cloneElement(children)}
    </section>
  </div>);
};

Discussions.propTypes = {
  children: PropTypes.object,
};

export default Discussions;
