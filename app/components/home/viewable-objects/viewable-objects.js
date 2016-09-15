import React, { Component, PropTypes } from 'react';
import style from './viewable-objects.scss';


class ViewableObjects extends Component {
  render() {
    return(
      <div className="viewable-objects-container">
        <h4 className="title">{this.props.title}</h4>
      </div>
    );
  }
}

ViewableObjects.propTypes = {
  title: PropTypes.string,
  objects: PropTypes.array.isRequired,
  lastestNews: PropTypes.string,
  action:PropTypes.object
};

export default ViewableObjects;
