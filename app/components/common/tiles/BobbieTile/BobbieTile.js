import bobbietilestyle from 'app/components/common/tiles/BobbieTile/BobbieTile.style.js';
import cmsstyle from 'app/components/common/tiles/BobbieTile/CMS.style.js';
import truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import style from './BobbieTile.style';
import CMSStyle from './CMS.style';
import ImageClickHandler from '../../ImageClickHandler';

const TRUNCATED_CONTENT_LENGTH = 800;
const TRUNCATED_BUTTON_TEXT = 'read more';
const DISPLAYED_BUTTON_TEXT = 'read less';

class BobbieTile extends Component {
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
        contentLength: this.props.HTMLBlob.length,
        buttonText: DISPLAYED_BUTTON_TEXT,
      });
    } else {
      this.setState({
        contentLength: TRUNCATED_CONTENT_LENGTH,
        buttonText: TRUNCATED_BUTTON_TEXT,
      });
    }
  };

  prepareContent(bodyContent = '', length) {
    return truncate(bodyContent, {
      length,
      separator: ' ',
    });
  }

  render() {
    const { contentLength, buttonText } = this.state;

    const {
      showTitle,
      title,
      showSubtitle,
      subtitle,
      readDuration,
      authorName,
      HTMLBlob,
    } = this.props;

    return (
      <Fragment>
        <div className="root">
          <div className="tile-content-container">
            {showTitle === true ? <h3>{title}</h3> : null}
            {showSubtitle === true ? <div className="subtitle">{subtitle}</div> : null}

            <ImageClickHandler>
              <span
                className="__html-blob-content-container__"
                dangerouslySetInnerHTML={{
                  __html: this.prepareContent(HTMLBlob, contentLength),
                }}
              />
              {HTMLBlob.length > TRUNCATED_CONTENT_LENGTH && (
                <div>
                  <button onClick={this.handleReadMoreClick} className="action-read-more">
                  {buttonText}
                </button></div>
              )}
              </ImageClickHandler>
            </div>
          </div>
        <style jsx>{style}</style>
        <style jsx>{bobbietilestyle}</style>
        <style jsx>{cmsstyle}</style>
      </Fragment>
    );
  }
}

BobbieTile.propTypes = {
  title: PropTypes.string.isRequired,
  readDuration: PropTypes.string,
  authorName: PropTypes.string,
  HTMLBlob: PropTypes.string.isRequired,
};

BobbieTile.defaultProps = {
  readDuration: '',
  authorName: '',
  HTMLBlob: '',
};

export default BobbieTile;
