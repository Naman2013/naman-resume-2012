import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Help.scss';
import AnchorParagraph from '../../components/common/anchor-paragraph/anchor-paragraph';

const mapStateToProps = ({ helpPage }) => ({
  ...helpPage,
});

@connect(mapStateToProps)
class Help extends Component {
  static propTypes = {
    anchor: PropTypes.string,
    paragraphs: PropTypes.array,
    termsAndConditions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.renderAnchorParagraph = this.renderAnchorParagraph.bind(this);
    this.renderTextParagraph = this.renderTextParagraph.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.anchor !== this.props.anchor;
  }

  renderSubParagraph = (paragraphObj) => {
    const {
      paragraphAnchor,
      title,
      paragraphs,
      textParagraphs,
    } = paragraphObj;

    return (
      <p
        key={paragraphAnchor || title}
        className=""
      >
        {title ?
          <p
            className="help-page-sub-title help-page-paragraph"
            dangerouslySetInnerHTML={{__html: title}}
          /> : null}
        {textParagraphs.map(p => {
          if (typeof p === 'string') {
            return this.renderTextParagraph(p);
          }
          return (
            <ul key={p[0].slice(10, 30)}>
              {p.map((item) => {
                return (
                  <li
                    className="help-page-paragraph"
                    key={item.slice(10, 30)}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
            </ul>
          );
        })}
      </p>
    );
  }

  renderAnchorParagraph(paragraphObj) {
    const { anchor } = this.props;
    const {
      paragraphAnchor,
      title,
      paragraphs,
      textParagraphs,
    } = paragraphObj;

    return (
      <AnchorParagraph
        key={paragraphAnchor || title}
        isActive={anchor === paragraphAnchor}
        className="help-page-section"
      >
        {title ?
          <p
            className="help-page-title help-page-paragraph"
            dangerouslySetInnerHTML={{__html: title}}
          /> : null}
        {textParagraphs.map(p => {
          if (typeof p === 'string') {
            return this.renderTextParagraph(p);
          }
          return (
            <ul key={p[0].slice(10, 30)}>
              {p.map((item) => {
                return (
                  <li
                    className="help-page-paragraph"
                    key={item.slice(10, 30)}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
            </ul>
          );
        })}
        {paragraphs ? paragraphs.map(p => this.renderSubParagraph(p)) : null}
      </AnchorParagraph>
    );
  }

  renderTextParagraph(paragraph) {
    return (
      <p
        className="help-page-paragraph"
        key={paragraph.slice(10, 30)}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    );
  }

  render() {
    const { paragraphs } = this.props;
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">Help</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          {paragraphs.map(paragraph => this.renderAnchorParagraph(paragraph))}
        </div>
      </div>
    );
  }
}

export default Help;
