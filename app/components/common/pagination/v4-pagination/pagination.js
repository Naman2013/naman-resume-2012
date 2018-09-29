import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import Pages from './pages';
import style from './pagination.style';

const Pagination = ({ pages }) => (
  <div className="pagination-root">
    <ul className="buttons">
      <li className="button">
        <GenericButton text="First" />
      </li>
      <li className="button">
        <GenericButton theme={{ transform: 'rotate(180deg)' }} icon={horizontalArrow} />
      </li>
    </ul>

    <div>
      <Pages pages={pages} />
    </div>

    <ul className="buttons">
      <li className="button">
        <GenericButton icon={horizontalArrow} />
      </li>
      <li className="button">
        <GenericButton text="Last" />
      </li>
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
