import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './pages.style';

const Pages = ({ pages }) => (
  <div>
    <ul className="page-select-root">
      {pages
        .map(page => <li className="page-select" key={`pagination-page-${page}`}><Link href="/home">{page}</Link></li>)
      }
    </ul>
    <style jsx>{style}</style>
  </div>
);

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
};

Pages.defaultProps = {
  pages: [1, 2, 3, 4],
};

export default Pages;
