import bobbietilestyle from 'app/components/common/tiles/BobbieTile/BobbieTile.style.js';
import cmsstyle from 'app/components/common/tiles/BobbieTile/CMS.style.js';
import truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import style from './AboutContent.style';

const TRUNCATED_CONTENT_LENGTH = 210;
const MAX_LENGTH = TRUNCATED_CONTENT_LENGTH * 1.2; // + 20%
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
  };

  state = {
    buttonText: TRUNCATED_BUTTON_TEXT,
    contentLength: TRUNCATED_CONTENT_LENGTH,
  };

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
  };

  render() {
    const { content } = this.props;
    const { contentLength, buttonText } = this.state;
    return (
      <Fragment>
        <span>
          {content.length > MAX_LENGTH ? (
            <>
              <span
                className="__html-blob-content-container__"
                dangerouslySetInnerHTML={{
                  __html: prepareContent(content, contentLength),
                }}
              />
              <p>
                <button
                  onClick={this.handleReadMoreClick}
                  className="action-read-more"
                >
                  {buttonText}
                </button>
              </p>
            </>
          ) : (
            <span
              className="__html-blob-content-container__"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </span>
        <style jsx>{style}</style>
        <style jsx>{bobbietilestyle}</style>
        <style jsx>{cmsstyle}</style>
      </Fragment>
    );
  }
}

export default AboutContent;
