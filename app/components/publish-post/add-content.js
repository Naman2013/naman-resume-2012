import React, { Component } from 'react';
import style from './add-content.scss';

class AddContent extends Component {
  render() {
    return  (
      <div className="add-content-wrapper">
        <label htmlFor="headline" className="label text-uppercase">Type in a simple headline for your post.</label>
        <input type="text" id="headline" placeholder="Headline" className="input input-headline" />
        <label htmlFor="content" className="label text-uppercase">Paste or type your main content here.</label>
        <textarea name="" id="content" cols="30" rows="12" className="input input-textarea" placeholder="Content"></textarea>
      </div>
    )
  }
}

export default AddContent;
