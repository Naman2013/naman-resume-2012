import React, { Fragment } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from '../../components/common/DisplayAtBreakpoint';
import GenericButton from '../../components/common/style/buttons/Button';
import style from './ObjectRelatedTile.style';

export default class ObjectRelatedTile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    excerpt: PropTypes.string,
    linkLabel: PropTypes.string,
    linkUrl: PropTypes.string,
    additionalContent: PropTypes.element,
    hasLink: PropTypes.bool,
    showDescription: PropTypes.bool,
    showExcerpt: PropTypes.bool,
    showMobileAdditionalContent: PropTypes.bool,
  };

  static defaultProps = {
    description: '',
    excerpt: '',
    linkLabel: '',
    linkUrl: '',
    additionalContent: null,
    hasLink: true,
    showDescription: true,
    showExcerpt: true,
    showMobileAdditionalContent: false,
  };

  navigateToLink = () => {
    browserHistory.push(this.props.linkUrl);
  };

  render() {
    const {
      title,
      subTitle,
      mobileSubTitle,
      description,
      excerpt,
      linkLabel,
      additionalContent,
      hasLink,
      showDescription,
      showExcerpt,
      showMobileAdditionalContent,
    } = this.props;
    return (
      <Fragment>
        <DisplayAtBreakpoint screenLarge screenXLarge screenMedium>
          <div className="root">
            <div className="tile-content-container">
              <div className="content">
                <div className="description-container">
                  <h3 dangerouslySetInnerHTML={{ __html: title }} />
                  <div
                    dangerouslySetInnerHTML={{ __html: subTitle }}
                    className="subtitle"
                  />
                  {showDescription && (
                    <div
                      className="__html-blob-content-container__"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                  {showExcerpt && (
                    <div
                      className="__html-blob-content-container__"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  )}
                  {hasLink && (
                    <GenericButton
                      text={linkLabel}
                      onClickEvent={this.navigateToLink}
                      renderIcon={() => (
                        <img
                          src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                          className="arrow-link"
                          alt=""
                        />
                      )}
                    />
                  )}
                </div>
                {additionalContent && (
                  <div className="additional-content">{additionalContent}</div>
                )}
              </div>
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <div className="root-mobile">
            <h3 className="title" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="mobile-content">
              <div className="subtitle-mobile">
                {mobileSubTitle}{' '}
                <img
                  onClick={this.navigateToLink}
                  className="arrow-link"
                  src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                  alt=""
                />
              </div>
              {showMobileAdditionalContent && <div>{additionalContent} </div>}
            </div>
          </div>
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}
