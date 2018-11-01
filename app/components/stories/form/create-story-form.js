import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleHeadlineChange = event => {
    this.setState({
      headlineContent: event.target.value,
    });
  }

  handleBodyContentChange = (editorHTML) => {
    this.setState({
      bodyContent: editorHTML,
    });
  }

  onSelectContentCategory = () => {
    
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
        <ContentCategorySelector
          contentCategories={contentCategories}
          contentCategoriesDescText={contentCategoriesDescText}
          selectedContentCategory={selectedContentCategory}
          onSelectContentCategory={this.onSelectContentCategory}
        />
        <HeadlineAndContentInputs
          bodyContent={bodyContent}
          handleBodyContentChange={this.handleBodyContentChange}
          handleHeadlineChange={this.handleHeadlineChange}
          headlineContent={headlineContent}
        />
        <ActionItems submitStory={submitStory} goBack={goBack} />
      </form>
    )
  }
}

export default CreateStoryForm;
