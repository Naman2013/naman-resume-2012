import React from 'react';
import PropTypes from 'prop-types';
import BrowseTaggedDataSearch from 'components/browse-tagged-data/BrowseTaggedDataSearch';

const propTypes = {
  isOpen: PropTypes.bool,
};

const defaultProps = {
  isOpen: false,
};

const Search = ({ isOpen }) => (
  <div>
    <BrowseTaggedDataSearch isOpen={isOpen} />
  </div>
);

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
