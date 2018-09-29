import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './pagination.style';

const Pagination = ({ pages }) => (
  <div>
    <ul className="page-select-root">
      {pages
        .map(page => <li className="page-select" key={`pagination-page-${page}`}><Link href="/home">{page}</Link></li>)
      }
    </ul>
    <style jsx>{style}</style>
  </div>
);

Pagination.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
};

Pagination.defaultProps = {
  pages: [1, 2, 3, 4],
};

export default Pagination;
