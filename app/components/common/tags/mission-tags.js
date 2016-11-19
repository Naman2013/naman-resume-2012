import React, { Component, PropTypes } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import style from './mission-tags.scss';

class MissionTags extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(){
    console.log('del');
  }

  handleAddition(){
    console.log('add');
  }

  handleDrag(){
    console.log('drag');
  }

  componentWillMount() {
    this.setState({
      objective: '',
      tags: [
        {id: 1, text: "galaxy"},
        {id: 2, text: "andromeda"},
        {id: 3, text: "canary islands"},
        {id: 4, text: "m31"},
        {id: 5, text: "deep space"}
      ]
    });
  }

  render() {

    const suggestions = ['mars', 'jupiter', 'moon', 'saturn'];

    return(
      <div className="slooh-mission-tags">
        <h4 className="title">MISSION TAGS:</h4>
        <ReactTags tags={ this.state.tags }
          suggestions={ suggestions }
          handleDelete={ this.handleDelete }
          handleAddition={ this.handleAddition }
          handleDrag={ this.handleDrag } />
      </div>
    );
  }
}

export default MissionTags;
