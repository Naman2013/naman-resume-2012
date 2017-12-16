import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initialState as defaultApplicationMetaData } from '../../modules/pageLevelMetaContent/seo-reducer';
import { resetPageMeta } from '../../modules/pageLevelMetaContent/seo-actions';

// TODO: move these consts and functions into their own file
const SUPPORTED_OPEN_GRAPH_PROPERTIES = [
  'title',
  'audio',
  'video',
  'description',
  'type',
  'url',
  'image',
  'site_name',
  'site',
];

function generateOpenGraphTags(ogTags = {}) {
  return SUPPORTED_OPEN_GRAPH_PROPERTIES.map(
    graphProperty => ogTags[graphProperty] &&
      <meta
        key={`og:${graphProperty}`}
        property={`og:${graphProperty}`}
        content={ogTags[graphProperty]}
      />,
    );
}

const SUPPORTED_STANDARD_META = [
  'description',
];

function generateMetaTags(tags = {}) {
  return SUPPORTED_STANDARD_META.map(
    property => tags[property] &&
      <meta
        key={property}
        name={property}
        content={tags[property]}
      />,
    );
}

const propTypes = {
  title: PropTypes.string,
  standard: PropTypes.shape({
    description: PropTypes.string,
  }),
  og: PropTypes.shape({
    title: PropTypes.string,
  }),
};

const defaultProps = { ...defaultApplicationMetaData };

const mapStateToProps = ({ pageLevelMetaContent }) => ({
  ...pageLevelMetaContent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetPageMeta,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PageMetaManagement extends Component {
  render() {
    return (
      <Helmet
        titleTemplate="%s | Slooh.com"
      >
        <title>{this.props.title}</title>
        { generateMetaTags(this.props.standard) }
        { generateOpenGraphTags(this.props.og) }
      </Helmet>
    );
  }
}

PageMetaManagement.propTypes = propTypes;
PageMetaManagement.defaultProps = defaultProps;


export default PageMetaManagement;
