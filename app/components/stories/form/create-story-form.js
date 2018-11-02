import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntroText from 'components/common/form-sections/intro-text';
import FormSectionHeader from 'components/common/form-sections/section-header';
import HeadlineAndContentInputs from './partials/headline-and-content-inputs';
import ActionItems from './partials/action-items';
import ContentCategorySelector from './partials/content-category-selector';

class CreateStoryForm extends Component {
  static propTypes = {
    submitStory: PropTypes.func.isRequired,
  }
  static defaultProps = {}
  state = {
    bodyContent: '',
    headlineContent: '',
    selectedContentCategory: '',
  }

  onSelectContentCategory = () => {

  }

  handleHeadlineChange = (event) => {
    this.setState({
      headlineContent: event.target.value,
    });
  }

  handleBodyContentChange = (editorHTML) => {
    this.setState({
      bodyContent: editorHTML,
    });
  }

  render() {
    const {
      goBack,
      submitStory,
      contentCategories,
      contentCategoriesDescText,
    } = this.props;
    const {
      bodyContent,
      headlineContent,
      selectedContentCategory,
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

        <FormSectionHeader
          title="V. Upload Image (optional)"
          desc="Upload JPEGS, GIFS, or PNGs here to add punch and meaning to your post"
        />
        <ActionItems submitStory={submitStory} goBack={goBack} />
      </form>
    )
  }
}

export default CreateStoryForm;
