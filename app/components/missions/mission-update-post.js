import React from 'react';
import styles from './mission-sidebar.scss';
import moment from 'moment';
import Markdown from 'react-remarkable';

const MissionUpdatePost = (props) => {
  const {update} = props;
  const pubDate = moment.unix(update.start).format('MMM Do, YYYY hh:mm A');

  return (
    <div className={styles.singleMissionUpdate}>
      <h5>{pubDate}</h5>
      <h6 className="byLine">from <em><Markdown source={update.author} /></em></h6>
      <p>{update.text}</p>
    </div>
  )
}

export default MissionUpdatePost;
