import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import Pages from './pages';
import style from './pagination.style';

const Pagination = ({ pages }) => (
  <div className="pagination-root">
    <div className="buttons">
      <GenericButton text="First" />
      <GenericButton icon={horizontalArrow} />
    </div>

    <div>
      <Pages pages={pages} />
    </div>

    <div className="buttons">
      <GenericButton icon={horizontalArrow} />
      <GenericButton text="Last" />
    </div>
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
