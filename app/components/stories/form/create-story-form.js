import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        <FormSectionHeader
          title="1. Select Content Category"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra dapibus augue. Etiam aliquam est eget augue fermentum placerat. Aenean ullamcorper ligula tortor, in lobortis nisl tristique non. Fusce ornare ante nisl, ut euismod mauris maximus ut. Nulla tincidunt, mauris sed facilisis viverra, tellus ligula venenatis mi, non sollicitudin felis turpis a ante."
        />
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
