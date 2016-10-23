import React from 'react';
import style from './object-title-bar.scss';

const ObjectTitleBar = ({ icon, title, telescopeUniqueId, objectUniqueId }) => {

  const titleStyle = {};

  return(
    <div className="object-title-bar">
      <div className="title-content">
        <h1
          style={titleStyle}
          className="title">{title}</h1>
      </div>

      <div className="call-to-action">
        <div className="sponsor">
          <p>Sponsored by: <img src="foo.jpg" width="120" /></p>
        </div>
        <ul className="actions">
          <li className="action"><a href="#">Reserve Telescope</a></li>
          <li className="action"><a href="#">Follow This Object</a></li>
          <li className="action"><a href="#">Create New Post</a></li>
        </ul>
      </div>

    </div>
  );
};

export default ObjectTitleBar;
