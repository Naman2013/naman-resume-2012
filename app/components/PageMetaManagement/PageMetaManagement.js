import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { initialState as defaultApplicationMetaData } from '../../modules/pageLevelMetaContent/seo-reducer';

const SUPPORT_OPEN_GRAPH_PROPERTIES = ['title', 'description', 'image', 'type'];

const propTypes = {
  pageTitle: PropTypes.string,
  og: PropTypes.shape({
    title: PropTypes.string,
  }),
};

const defaultProps = { ...defaultApplicationMetaData };

const mapStateToProps = ({ pageLevelMetaContent }) => ({
  pageLevelMetaContent,
});

function generateOpenGraphTags(ogTags = {}) {
  return SUPPORT_OPEN_GRAPH_PROPERTIES.map(
    graphProperty => ogTags[graphProperty] &&
      <meta
        key={`og:${graphProperty}`}
        property={`og:${graphProperty}`}
        content={ogTags[graphProperty]}
      />,
    );
}

@connect(mapStateToProps, null)
class PageMetaManagement extends Component {
  render() {
    return (
      <Helmet
        titleTemplate="%s | Slooh.com"
      >
        <title>{this.props.pageTitle}</title>
        { generateOpenGraphTags(this.props.og) }
      </Helmet>
    );
  }
}

PageMetaManagement.propTypes = propTypes;
PageMetaManagement.defaultProps = defaultProps;


export default PageMetaManagement;
