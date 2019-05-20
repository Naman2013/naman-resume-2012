import cmsstyle from 'app/components/common/tiles/BobbieTile/CMS.style';
import cx from 'classnames';
import truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImageClickHandler from '../../ImageClickHandler';
import style from './BobbieTile.style';

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
      disableReadMore,
      embed,
    } = this.props;

    return (
      <Fragment>
        <div className={cx('root', { embed })}>
          <div className="tile-content-container">
            {showTitle === true ? <h3>{title}</h3> : null}
            {showSubtitle === true ? (
              <div className="subtitle">{subtitle}</div>
            ) : null}

            {disableReadMore == true && (
              <span
                className="__html-blob-content-container__"
                dangerouslySetInnerHTML={{ __html: HTMLBlob }}
              />
            )}
            {disableReadMore == false && (
              <Fragment>
                <ImageClickHandler>
                  <span
                    className="__html-blob-content-container__"
                    dangerouslySetInnerHTML={{
                      __html: this.prepareContent(HTMLBlob, contentLength),
                    }}
                  />
                  {HTMLBlob.length > TRUNCATED_CONTENT_LENGTH && (
                    <div>
                      <button
                        onClick={this.handleReadMoreClick}
                        className="action-read-more"
                      >
                        {buttonText}
                      </button>
                    </div>
                  )}
                </ImageClickHandler>
              </Fragment>
            )}
          </div>
        </div>
        <style jsx>{style}</style>
        <style jsx>{cmsstyle}</style>
        <style jsx>{`
          .root.embed {
            box-shadow: none;
          }
          .embed .tile-content-container {
            padding: 0;
          }
        `}</style>
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
  disableReadMore: false,
};

export default BobbieTile;
