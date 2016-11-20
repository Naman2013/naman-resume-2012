import React, { Component, PropTypes } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setTags } from '../../../modules/tag-management/Tags';
import style from './mission-tags.scss';

/**
  example tag structure from API
  {
    tagIndex: 0,
    tagText: 'Sandwich'
  }

  we map this to:
  {
    id: [tagIndex],
    text: [tagText,]
  }
*/

const mapStateToProps = ({ tags }) => ({
  ...tags,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setTags,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionTags extends Component {

  constructor(props) {
    super(props);

    // TODO: refactor out...
    this.state = {
      tagText: '',
      objective: '',
      tags: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagTextChange = this.handleTagTextChange.bind(this);
  }

  handleDelete() {
    console.log('del');
  }

  handleAddition() { return false; }
  handleDrag() { return false; }

  resetTagText() {
    this.setState({
      tagText: '',
    });
  }

  handleTagTextChange(event) {
    this.setState({
      tagText: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { tagText } = this.state;
    const { tagClass, tagType, scheduledMissionId, imageId } = this.props;

    this.props.actions.setTags({
      text: tagText,
      tagClass,
      tagType,
      scheduledMissionId,
      imageId,
    });

    this.resetTagText();
  }

  render() {

    const { tagText } = this.state;
    const { tags } = this.props;

    let availableTags = [];

    if(tags) {
      availableTags = tags.tagList.map( tag => ({ id: tag.tagIndex, text: tag.tagText }) );
    }

    return(
      <div className="slooh-mission-tags">
        <h4 className="title">MISSION TAGS:</h4>
        <ReactTags
          tags={availableTags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} />

        <form className="add-tag-form" onSubmit={this.handleSubmit} method="POST">
          <input
            className="tag-text"
            placeholder="Tag text"
            type="text"
            name="tag-name"
            onChange={this.handleTagTextChange}
            value={tagText} />
          <button className="action" type="submit">Add a Tag</button>
        </form>
      </div>
    );
  }
}

MissionTags.defaultProps = {
  imageId: '',
};

MissionTags.propTypes = {
  tagClass: PropTypes.string.isRequired,
  tagType: PropTypes.string.isRequired,
  scheduledMissionId: PropTypes.number.isRequired,
  imageId: PropTypes.string,
};

export default MissionTags;
