import React, { Component } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import TopicActions from './TopicActions';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './GuideBodyContent.style';

function prepareContent(bodyContent = '', length) {
  return truncate(bodyContent, {
    length,
    separator: ' ',
  });
}

const TRUNCATED_CONTENT_LENGTH = 210;
const TRUNCATED_BUTTON_TEXT = 'read more';
const DISPLAYED_BUTTON_TEXT = 'read less';

class GuideBodyContent extends Component {
  state = {
    buttonText: 'read more',
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
    const {
      title,
      content,
      topicActionProps,
      guideId,
      footer,
      theme,
    } = this.props;

    const { contentLength, buttonText } = this.state;

    return (
      <div className="root" style={theme}>
        <h4 className="title">{title}</h4>
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

        <DisplayAtBreakpoint
          screenMedium
        >
          <TopicActions {...topicActionProps} guideId={guideId} />
        </DisplayAtBreakpoint>
        {footer ? footer() : null}
        <style jsx>{style}</style>
      </div>
    );
  }
}

GuideBodyContent.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
  topicActionProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
  }).isRequired,
  guideId: PropTypes.string.isRequired,
};

GuideBodyContent.defaultProps = {
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default GuideBodyContent;
