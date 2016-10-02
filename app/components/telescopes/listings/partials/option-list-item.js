import React, { Component } from 'react';
import { Link } from 'react-router';

export default class OptionListItem extends Component {
  render(){
    return (
      <div className="option-list_item">
        <img className="icon" src={this.props.icon}/>
        {this.props.name}
      </div>
    );  
  }  
}

