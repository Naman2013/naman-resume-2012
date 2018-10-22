import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import style from './AboutContent.style';

const TRUNCATED_CONTENT_LENGTH = 210;
const TRUNCATED_BUTTON_TEXT = 'read more';
const DISPLAYED_BUTTON_TEXT = 'read less';

function prepareContent(bodyContent = '', length) {
  return truncate(bodyContent, {
    length,
    separator: ' ',
  });
}

class AboutContent extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  }

  state = {
    buttonText: TRUNCATED_BUTTON_TEXT,
    contentLength: TRUNCATED_CONTENT_LENGTH,
  }

  handleReadMoreClick = () => {
    if (this.state.contentLength === TRUNCATED_CONTENT_LENGTH) {
      this.setState({
        contentLength: this.props.content.length,
        buttonText: DISPLAYED_BUTTON_TEXT,
      });
    } else {
      this.setState({
        contentLength: TRUNCATED_CONTENT_LENGTH,
        buttonText: TRUNCATED_BUTTON_TEXT,
      });
    }
  }

  render() {
    const { content } = this.props;
    const { contentLength, buttonText } = this.state;

    return (
      <Fragment>
        <span
          className="__html-content__"
          dangerouslySetInnerHTML={{
          __html: prepareContent(content, contentLength)
          }}
        />
        {
          content.length > TRUNCATED_CONTENT_LENGTH &&
            <button
              onClick={this.handleReadMoreClick}
              className="action-read-more"
            >
              {buttonText}
            </button>
        }
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}

export default AboutContent;
