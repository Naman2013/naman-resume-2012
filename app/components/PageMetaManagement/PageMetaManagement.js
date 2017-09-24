import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { initialState } from '../../modules/pageLevelMetaContent/seo-reducer';

const propTypes = {
  pageTitle: PropTypes.string,
};

const defaultProps = { ...initialState };

const mapStateToProps = ({ pageLevelMetaContent }) => ({
  pageLevelMetaContent,
});

@connect(mapStateToProps, null)
class PageMetaManagement extends Component {
  render() {
    return (
      <Helmet>
        <title>{this.props.pageTitle}</title>
      </Helmet>
    );
  }
}

PageMetaManagement.propTypes = propTypes;
PageMetaManagement.defaultProps = defaultProps;


export default PageMetaManagement;
