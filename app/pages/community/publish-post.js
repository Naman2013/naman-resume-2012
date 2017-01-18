import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/publish-post/header';
import { setTags, deleteTag } from '../../modules/tag-management/Tags';
import SelectContentCategory from '../../components/publish-post/select-content-category';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import { fetchCategoryTopicList } from '../../modules/browse-popular-objects/api';
import submitObjectContent from '../../modules/community-content/submit-object-content';
import setPostImages from '../../modules/set-post-images';

import AddContent from '../../components/publish-post/add-content';
import AddTags from '../../components/publish-post/add-tags';
import UploadImage from '../../components/publish-post/upload-image';
import style from './publish-post.scss';

const mapStateToProps = ({ user, tags }) => ({
  tags,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setTags,
    deleteTag,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PublishPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentCategory: 'scienceLog',
      selectedCatagoryIndex: null,
      categoryList: [],
      postUUID: null,
      selectedTopicIndex: null,
      headline: '',
      bodyContent: '',
      newTagContent: '',
      S3URLs: [],
      uploadedImages: [],
    };

    this.handleCategoryListSelect = this.handleCategoryListSelect.bind(this);
    this.handleCatagorySelectChange = this.handleCatagorySelectChange.bind(this);
    this.handleTopicSelectChange = this.handleTopicSelectChange.bind(this);
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleBodyContentChange = this.handleBodyContentChange.bind(this);
    this.handleAddNewTag = this.handleAddNewTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleTagTextChange = this.handleTagTextChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
  }

  componentWillMount() {
    this.setupForm();
  }

  setupForm() {
    const { cid, at, token } = this.props.user;
    fetchCategoryTopicList({
      cid,
      at,
      token,
    }).then(result => this.handleCategoryResponse(result.data));
  }

  handleCategoryResponse({ categoryList, postUUID }) {
    this.setState({
      categoryList,
      postUUID,
      selectedCatagoryIndex: null,
      selectedTopicIndex: null,
      headline: '',
      bodyContent: '',
      newTagContent: '',
      S3URLs: [],
      uploadedImages: [],
    });

    window.scrollTo(0, 0);
  }

  handleCategoryListSelect(contentCategory) {
    this.setState({
      contentCategory,
    });
  }

  handleAddNewTag(event) {
    event.preventDefault();
    const { newTagContent, postUUID } = this.state;

    this.props.actions.setTags({
      tagClass: 'content',
      tagType: 'post',
      uniqueId: postUUID,
      text: newTagContent,
    });

    this.setState({
      newTagContent: '',
    });
  }

  handleRemoveTag(event, tagIndex) {
    event.preventDefault();

    const { postUUID } = this.state;
    const tagText = this.findTag(tagIndex);
    this.props.actions.deleteTag({
      tagClass: 'content',
      tagType: 'post',
      uniqueId: postUUID,
      text: tagText.tagText,
    });
  }

  findTag(tagIndex) {
    return this.tagList[tagIndex];
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

    const { cid, token, at } = this.props.user;
    const { postUUID } = this.state;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('uniqueId', postUUID);
    data.append('imageClass', 'community');
    data.append('attachment', event.target.files[0]);

    setPostImages(data).then(result => this.handleUploadImageResponse(result.data));
  }

  handleUploadImageResponse(uploadFileData) {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      imageList: uploadFileData.imageList,
    });
  }

  handleSubmitPost(event) {
    event.preventDefault();
    const { at, token, cid } = this.props.user;
    const tags = this.tagList.map(tag => tag.tagText);
    const { headline, bodyContent, S3URLs, contentCategory } = this.state;
    const topic = this.selectedTopic;

    if (topic) {
      submitObjectContent({
        at,
        token,
        cid,
        objectSlug: topic.topicSlug,
        type: contentCategory,
        title: headline,
        content: bodyContent,
        postTags: tags,
        S3URLs,
      }).then(() => {
        alert('Your post has been submitted for review.  Your post will appear on the website once it has been approved.');
        this.setupForm();
      });
    } else {
      alert('Make sure to select a category AND a topic for your post.');
    }
  }

  get objectCategories() {
    return this.state.categoryList.map(category => category.categoryDisplayName);
  }

  get currentCategory() {
    const { selectedCatagoryIndex } = this.state;
    return this.state.categoryList[selectedCatagoryIndex];
  }

  get currentCategoryTopics() {
    const { categoryList, selectedCatagoryIndex } = this.state;
    return (categoryList[selectedCatagoryIndex]
            && categoryList[selectedCatagoryIndex].categoryTopicList) || [];
  }

  get formattedCategoryTopics() {
    return _.flatten(this.currentCategoryTopics.map((topic) => {
      if (topic.topicIsSubcategory) {
        return {
          title: topic.topicName,
        };
      }

      return {
        option: topic.topicDisplayName,
        ...topic,
      };
    }));
  }

  get selectedTopic() {
    const { selectedTopicIndex } = this.state;
    return this.formattedCategoryTopics[selectedTopicIndex];
  }

  get tagList() {
    const { tags } = this.props;
    return _.has(tags, 'tags.tagList') ? tags.tags.tagList : [];
  }

  render() {
    const {
      selectedCategoryListIndex,
      selectedCatagoryIndex,
      selectedTopicIndex,
      headline,
      bodyContent,
      newTagContent,
      S3URLs,
    } = this.state;

    return (
      <div>
        <Header />
        <ul className="publish-post-list">
          <li className="item">
            <span className="number">1</span>
            <p className="description">Select a Content Category</p>
            <SelectContentCategory
              handleCategoryClick={this.handleCategoryListSelect}
            />
          </li>

          <li className="item">
            <span className="number">2</span>
            <p className="description">Select an Object Category and Object Topic from the List</p>

            <div className="select-object-category-and-topic-wrapper">
              <div className="select-object-category">
                <ReservationSelectList
                  options={this.objectCategories}
                  name={'catagories'}
                  handleSelectChange={this.handleCatagorySelectChange}
                  selectedIndex={selectedCatagoryIndex}
                />
              </div>

              <div className="select-object-topic">
                <ReservationSelectList
                  options={this.formattedCategoryTopics}
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
              tags={this.tagList}
            />
          </li>

          <li className="item">
            <span className="number">5</span>
            <p className="description">Upload Image <span className="param">(optional)</span></p>

            <UploadImage
              handleUploadImage={this.handleUploadImage}
              displayImages={S3URLs}
            />
          </li>

          <li className="item">
            <button className="btn-primary cancel-btn">Sorry, Cancel This.</button>
            <button onClick={this.handleSubmitPost} className="btn-primary">Submit for Review</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default PublishPost;
