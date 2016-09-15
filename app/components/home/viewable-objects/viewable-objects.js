import React, { Component, PropTypes } from 'react';
import ViewableObject from './viewable-object';
import style from './viewable-objects.scss';


class ViewableObjects extends Component {

  generateViewableObjects() {
    return this.props.objects.map( skyObject => <ViewableObject {...skyObject} /> );
  }

  render() {
    return(
      <div className="viewable-objects-container">
        <h4 className="title">{this.props.title}</h4>

        {this.generateViewableObjects()}
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
