import React from 'react';
import styles from './mission-updates.scss';

const MissionUpdatePost = () => {
  return (
    <div className={styles.singleMissionUpdate}>
      <h5>August 4th, 2016  12:02 AM</h5>
      <h6 className="byLine">from <em>Paul Cox</em></h6>
      <p>You may have noticed several of the Canary Islands scopes have been offline this past week. Believe it or not they received 4 feet of snow around the observatory in the last month! Hopefully the area will thaw out soon and we can kick back into scheduled missions. Thanks for your patience!</p>
    </div>
  )
}

export default MissionUpdatePost;
