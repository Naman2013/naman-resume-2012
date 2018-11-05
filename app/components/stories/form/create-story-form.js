import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import IntroText from 'components/common/form-sections/intro-text';
import FormSectionHeader from 'components/common/form-sections/section-header';
import Tags from 'components/common/form-fields/tags';
import UploadImages from 'components/common/form-fields/upload-images';
import HeadlineAndContentInputs from './partials/headline-and-content-inputs';
import ActionItems from './partials/action-items';
import ContentCategorySelector from './partials/content-category-selector';
import ObjectCategoryAndTopicSelects from './partials/object-category-and-topic-selects';

class CreateStoryForm extends Component {
  static propTypes = {
    contentCategories: PropTypes.arrayOf(PropTypes.shape({})),
    goBack: PropTypes.func.isRequired,
    objectCategoriesList: PropTypes.arrayOf(PropTypes.shape({})),
    submitStory: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    user: PropTypes.shape({
      at: PropTypes.isRequired,
      token: PropTypes.isRequired,
      cid: PropTypes.isRequired,
    }).isRequired,
    actions: PropTypes.shape({}),
  }
  static defaultProps = {
    actions: {},
    objectCategoriesList: [],
    contentCategories: [],
  }
  state = {
    bodyContent: '',
    headlineContent: '',
    S3URLs: [],
    selectedContentCategory: null,
    selectedObjectCategory: null,
    selectedObjectCategoryIndex: null,
    selectedObjectTopic: null,
    tags: [],
  }

  onSelectContentCategory = (value) => {
    this.setState(() => ({
      selectedContentCategory: value,
    }));
  }

  onSelectObjectCategory = (event) => {
    const { target, currentTarget } = event;
    this.setState(() => ({
      selectedObjectCategory: target.value,
      selectedObjectCategoryIndex: Number(currentTarget.dataset.index),
      selectedObjectTopic: null,
    }));
  }

  onSelectObjectTopic = (event) => {
    const { target } = event;
    this.setState(() => ({
      selectedObjectTopic: target.value,
    }));
  }

  onTagsChange = (tags) => {
    this.setState(() => ({
      tags,
    }));
  }

  onImagesChange = (S3URLs) => {
    this.setState(() => ({
      S3URLs,
    }));
  }

  get formattedObjectCategories() {
    return this.props.objectCategoriesList.map(category => ({
      label: category.categoryDisplayName,
      value: category.categorySlug,
    }));
  }

  get currentCategoryTopics() {
    const { objectCategoriesList } = this.props;
    const { selectedObjectCategoryIndex } = this.state;
    return objectCategoriesList[selectedObjectCategoryIndex] ?
      objectCategoriesList[selectedObjectCategoryIndex].categoryTopicList : [];
  }

  get formattedCategoryTopics() {
    return flatten(this.currentCategoryTopics.map(topic => ({
      label: topic.topicDisplayName,
      value: topic.topicSlug,
    })));
  }

  handleHeadlineChange = (event) => {
    const { target } = event;
    this.setState(() => ({
      headlineContent: target.value,
    }));
  }

  handleBodyContentChange = (editorHTML) => {
    this.setState(() => ({
      bodyContent: editorHTML,
    }));
  }


  render() {
    const {
      actions,
      contentCategories,
      contentCategoriesDescText,
      goBack,
      submitStory,
      uuid,
      user,
    } = this.props;
    const {
      bodyContent,
      headlineContent,
      S3URLs,
      selectedContentCategory,
      selectedObjectCategory,
      selectedObjectTopic,
      tags,
    } = this.state;
    return (
      <form>
        <IntroText desc="Illuminations publishes stories by authors who lend their perspective to enrich the Slooh experience. Submissions are associated with celestial objects or types of objects. They are categorized into one of four content categories designed to provide a diversity of views regarding what is 'out there', fueled by science, imagination, spirituality and personal experience. In order to become a contributing author, please read our Guidelines and submit a post below for editorial review." />

        <FormSectionHeader
          title="I. Select Content Category"
        />
        <ContentCategorySelector
          contentCategories={contentCategories}
          contentCategoriesDescText={contentCategoriesDescText}
          selectedContentCategory={selectedContentCategory}
          onSelectContentCategory={this.onSelectContentCategory}
        />

        <FormSectionHeader
          title="II. Select Object Category and Object Topic"
        />
        <ObjectCategoryAndTopicSelects
          formattedObjectCategories={this.formattedObjectCategories}
          formattedCategoryTopics={this.formattedCategoryTopics}
          selectedObjectCategory={selectedObjectCategory}
          selectedObjectTopic={selectedObjectTopic}
          onSelectObjectCategory={this.onSelectObjectCategory}
          onSelectObjectTopic={this.onSelectObjectTopic}
        />

        <FormSectionHeader
          title="III. Add Your Content"
        />
        <HeadlineAndContentInputs
          bodyContent={bodyContent}
          handleBodyContentChange={this.handleBodyContentChange}
          handleHeadlineChange={this.handleHeadlineChange}
          headlineContent={headlineContent}
        />

        <FormSectionHeader
          title="IV. Add Tags"
        />
        <Tags
          onTagsChange={this.onTagsChange}
          tagClass="content"
          tags={tags}
          tagType="post"
          user={user}
          uuid={uuid}
          validateResponseAccess={actions.validateResponseAccess}
        />

        <FormSectionHeader
          title="V. Upload Image (optional)"
          desc="Upload JPEGS, GIFS, or PNGs here to add punch and meaning to your post"
        />

        <UploadImages
          imageClass="community"
          onImagesChange={this.onImagesChange}
          S3URLs={S3URLs}
          uuid={uuid}
          user={user}
          validateResponseAccess={actions.validateResponseAccess}
        />
        <ActionItems submitStory={submitStory} goBack={goBack} />
      </form>
    )
  }
}

export default CreateStoryForm;
