import React, { Component, PropTypes } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTags } from '../../../modules/tag-management/Tags';
import style from './mission-tags.scss';

const mapStateToProps = ({ tags }) => ({
  tags,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchTags,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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

  componentDidMount() {
    const {
      tagClass,
      tagType,
      scheduledMissionId,
      imageId,
    } = this.props;

    this.props.actions.fetchTags({
      tagClass,
      tagType,
      scheduledMissionId,
      imageId,
    });
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
