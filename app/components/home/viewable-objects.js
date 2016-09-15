import React, { Component, PropTypes } from 'react';
import style from './viewable-objects.scss';


class ViewableObjects extends Component {
  render() {
    return(
      <div className="viewable-objects-container">
        Viewable objects...
      </div>
    );
  }
}

ViewableObjects.propTypes = {
  objects: PropTypes.array.isRequired,
  lastestNews: PropTypes.string,
  action:PropTypes.object
};

export default ViewableObjects;
