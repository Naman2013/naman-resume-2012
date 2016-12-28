import React, { Component } from 'react';
import style from './add-tags.scss';

class AddTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: ['galaxy', 'andromeda', 'canary islands', 'm31', 'deep space'],
      newTag: ''
    };

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTag(tag) {
    if (!tag.length) { return };

    this.setState({
      tags: this.state.tags.concat([tag]),
      newTag: ''
    });
  }

  removeTag(index) {
    this.setState({
      tags: this.state.tags.filter((_, i) => i !== index )
    });
  }

  handleChange(e) {
    this.setState({
      newTag: e.target.value
    });
  }

  render() {
    const tags = this.state.tags.map((tag, i) => {
      return (
        <li key={i} className="tag">
          {tag}
          <button
            className="remove-tag-btn"
            onClick={() => this.removeTag(i)}
          >
            x
          </button>
        </li>
      );
    });

    return  (
      <div className="add-tags-wrapper">
        <ul className="tags-list">{tags}</ul>

        <form
          className="tag-form"
          onSubmit={() => this.addTag(this.state.newTag)}
        >
          <input
            className="tag-input text-center"
            type="text" placeholder="Type A Tag Here"
            value={this.state.newTag}
            onChange={this.handleChange}
          />
          <button className="tag-add-btn" type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddTags;
