import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './pages.style';

const Pages = ({ pages, activePage, onPageSelect }) => (
  <div>
    <ul className="page-select-root">
      {pages
        .map(page => (
          <li className="page-select" key={`pagination-page-${page}`}>
            <button
              className={classnames('action', { active: page === activePage })}
              onClick={() => { onPageSelect({ pageNumber: page }); }}
            >
              {page}
            </button>
          </li>
        ))
      }
    </ul>
    <style jsx>{style}</style>
  </div>
);

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
  activePage: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};

Pages.defaultProps = {
  pages: [1, 2, 3, 4],
};

export default Pages;
