import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewableObject from './viewable-object';
import style from './viewable-objects.scss';


class ViewableObjects extends Component {

  generateViewableObjects() {
    return this.props.recommendsArray.map(skyObject => <ViewableObject {...skyObject} />);
  }

  render() {
    const inlineDescriptionStyle = {
      marginTop: '20px',
      marginBottom: '20px',
      fontWeight: 'normal',
      marginLeft: '100px',
      marginRight: '100px',
    };

    return (
      <div className="viewable-objects-container">
        <h4 className="title">{this.props.recommendsSubhead}</h4>

        <div style={inlineDescriptionStyle}>
          <p className="content">{this.props.recommendsDescription}</p>
        </div>

        <div className="objects clearfix">
          {this.props.recommendsArray && this.generateViewableObjects()}
        </div>

        <p className="latest-news">{this.props.latestNews}</p>
      </div>
    );
  }
}

ViewableObjects.propTypes = {
  title: PropTypes.string,
  recommendsArray: PropTypes.array.isRequired,
  lastestNews: PropTypes.string,
  action:PropTypes.object
};

export default ViewableObjects;
