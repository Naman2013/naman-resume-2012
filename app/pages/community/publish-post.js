import React, { Component } from 'react';
import Header from '../../components/publish-post/header';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTag, deleteTag } from '../../modules/tag-management/Tags';
import SelectContentCategory from '../../components/publish-post/select-content-category';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';

import AddContent from '../../components/publish-post/add-content';
import AddTags from '../../components/publish-post/add-tags';
import testData from '../reserve/reserve-by-objects-data';
import UploadImage from '../../components/publish-post/upload-image';
import style from './publish-post.scss';

const mapStateToProps = ({ tags }) => ({
  tags,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setTag,
    deleteTag,
  }, dispatch),
});

@connect(mapStateToProps)
class PublishPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCatagoryIndex: undefined,
      selectedTopicIndex: undefined,
      headline: '',
      bodyContent: '',
      newTagContent: '',
      uploadedImages: [],
    };

    this.handleCatagorySelectChange = this.handleCatagorySelectChange.bind(this);
    this.handleTopicSelectChange = this.handleTopicSelectChange.bind(this);
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleBodyContentChange = this.handleBodyContentChange.bind(this);
    this.handleAddNewTag = this.handleAddNewTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleTagTextChange = this.handleTagTextChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleAddNewTag(event) {
    event.preventDefault();
    const { newTagContent } = this.state;
    // TODO: complete set tag function
    // TODO: clear out newTagContent
    console.log('call set tag.');
    // this.props.actions.setTag();
  }

  handleRemoveTag(event, tagIndex) {
    event.preventDefault();
    // TODO: handle removing tag
    console.log('remove tag...');
  }

  handleTagTextChange(event) {
    this.setState({
      newTagContent: event.target.value,
    });
  }

  handleHeadlineChange(event) {
    this.setState({
      headline: event.target.value,
    });
  }

  handleBodyContentChange(event) {
    this.setState({
      bodyContent: event.target.value,
    });
  }

  handleCatagorySelectChange(event) {
    this.setState({
      selectedCatagoryIndex: event.target.value,
    });
  }

  handleTopicSelectChange(event) {
    this.setState({
      selectedTopicIndex: event.target.value,
    });
  }

  handleUploadImage(event) {
    event.preventDefault();
    console.log('value...');
    console.log(event.target.value);
    console.log('files...');
    console.log(event.target.files);
    // TODO: handle uploading the new image and updating internal state
    console.log('handle upload image');
  }

  render() {
    const { tags } = this.props;
    const {
      selectedCatagoryIndex,
      selectedTopicIndex,
      headline,
      bodyContent,
      newTagContent,
      uploadedImages
    } = this.state;
    const availableObjectCatagories = testData.categories.map(catagory => catagory.title);
    const selectedObjectCatagory = testData.categories[selectedCatagoryIndex];

    let objectTopics = [];
    if(selectedObjectCatagory) {
      objectTopics = _.flatten(selectedObjectCatagory.objects.map(objectCatagory => {
        return objectCatagory.items.map((item, index) => {
          if(index === 0) {
            return {
              title: objectCatagory.title,
              option: item.title,
            }
          }
          return item.title;
        });
      }));
    }

    return (
      <div>

        <Header />

        <ul className="publish-post-list">
          <li className="item">
            <span className="number">1</span>
            <p className="description">Select a Content Category</p>
            <SelectContentCategory />
          </li>

          <li className="item">
            <span className="number">2</span>
            <p className="description">Select an Object Category and Object Topic from the List</p>

            <div className="select-object-category-and-topic-wrapper">
              <div className="select-object-category">
                <ReservationSelectList
                  options={availableObjectCatagories}
                  name={'catagories'}
                  handleSelectChange={this.handleCatagorySelectChange}
                  selectedIndex={selectedCatagoryIndex}
                />
              </div>

              <div className="select-object-topic">
                <ReservationSelectList
                  options={objectTopics}
                  name="topics"
                  handleSelectChange={this.handleTopicSelectChange}
                  selectedIndex={selectedTopicIndex}
                />
              </div>
            </div>


          </li>

          <li className="item">
            <span className="number">3</span>
            <p className="description">Add Your Content</p>
            <AddContent
              headlineContent={headline}
              handleHeadlineChange={this.handleHeadlineChange}
              bodyContent={bodyContent}
              handleBodyContentChange={this.handleBodyContentChange}
            />
          </li>

          <li className="item">
            <span className="number">4</span>
            <p className="description">Add Tags <span className="param">(optional)</span></p>
            <AddTags
              newTagText={newTagContent}
              handleTagTextChange={this.handleTagTextChange}
              handleAddNewTag={this.handleAddNewTag}
              handleRemoveTag={this.handleRemoveTag}
              tags={tags.tags}
            />
          </li>

          <li className="item">
            <span className="number">5</span>
            <p className="description">Upload Image <span className="param">(optional)</span></p>

            <UploadImage
              handleUploadImage={this.handleUploadImage}
              displayImages={uploadedImages}
            />
          </li>

          <li className="item">
            <button className="btn-primary cancel-btn">Sorry, Cancel This.</button>
            <button className="btn-primary">Submit for Review</button>
          </li>
        </ul>
      </div>
    )
  }
}

export default PublishPost;
