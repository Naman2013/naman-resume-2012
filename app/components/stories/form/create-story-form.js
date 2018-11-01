import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadlineAndContentInputs from './partials/headline-and-content-inputs';

class CreateStoryForm extends Component {
  static propTypes = {
    submitStory: PropTypes.func.isRequired,
  }
  static defaultProps = {}
  state = {
    bodyContent: '',
    headlineContent: '',
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

  render() {
    const {
      submitStory,
    } = this.props;
    const {
      bodyContent,
      headlineContent,
    } = this.state;
    return (
      <form>
        <HeadlineAndContentInputs
          bodyContent={bodyContent}
          handleBodyContentChange={this.handleBodyContentChange}
          handleHeadlineChange={this.handleHeadlineChange}
          headlineContent={headlineContent}

        />
      </form>
    )
  }
}

export default CreateStoryForm;
