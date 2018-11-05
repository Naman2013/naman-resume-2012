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
    cancelLabel: PropTypes.string.isRequired,
    contentCategories: PropTypes.arrayOf(PropTypes.shape({})),
    goBack: PropTypes.func.isRequired,
    introText: PropTypes.string,
    objectCategoriesList: PropTypes.arrayOf(PropTypes.shape({})),
    sectionLabels: PropTypes.shape({
      [PropTypes.string]: PropTypes.shape({
        title: PropTypes.string.isRequired,
        desc: PropTypes.string,
      })
    }),
    submitLabel: PropTypes.string.isRequired,
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
    contentCategories: [],
    introText: '',
    objectCategoriesList: [],
    sectionLabels: {
      section1: {
        title: '',
      },
      section2: {
        title: '',
      },
      section3: {
        title: '',
      },
      section4: {
        title: '',
      },
      section5: {
        title: '',
      },
    },
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

  onSelectContentCategory = (event) => {
    const { value } = event.currentTarget.dataset;
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
      cancelLabel,
      contentCategories,
      contentCategoriesDescText,
      goBack,
      introText,
      sectionLabels,
      submitLabel,
      submitStory,
      user,
      uuid,
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
        <IntroText desc={introText} />

        <FormSectionHeader
          title={sectionLabels.section1.title}
        />
        <ContentCategorySelector
          contentCategories={contentCategories}
          contentCategoriesDescText={contentCategoriesDescText}
          selectedContentCategory={selectedContentCategory}
          onSelectContentCategory={this.onSelectContentCategory}
        />

        <FormSectionHeader
          title={sectionLabels.section2.title}
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
          title={sectionLabels.section3.title}
        />
        <HeadlineAndContentInputs
          bodyContent={bodyContent}
          handleBodyContentChange={this.handleBodyContentChange}
          handleHeadlineChange={this.handleHeadlineChange}
          headlineContent={headlineContent}
        />

        <FormSectionHeader
          title={sectionLabels.section4.title}
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
          title={sectionLabels.section5.title}
          desc={sectionLabels.section5.desc}
        />

        <UploadImages
          imageClass="community"
          onImagesChange={this.onImagesChange}
          S3URLs={S3URLs}
          uuid={uuid}
          user={user}
          validateResponseAccess={actions.validateResponseAccess}
        />
        <ActionItems
          cancelLabel={cancelLabel}
          goBack={goBack}
          submitLabel={submitLabel}
          submitStory={submitStory}
        />
      </form>
    );
  }
}

export default CreateStoryForm;
