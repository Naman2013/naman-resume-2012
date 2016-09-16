import React, { Component, PropTypes } from 'react';
import style from './viewable-object.scss';

class ViewableObject extends Component {
  render() {
    const viewableObjectInlineStyle = {
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundCover: 'cover',
      minHeight: '180px'
    };

    return(
      <div className="viewable-object"
        style={viewableObjectInlineStyle}>
        <h5 className="title">{this.props.title}</h5>
      </div>
    );
  }
}

ViewableObject.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string
};

export default ViewableObject;
