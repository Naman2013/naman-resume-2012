import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import Pages from './pages';
import style from './pagination.style';

class Pagination extends Component {
  static propTypes = {
    activePage: PropTypes.number,
    pages: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    activePage: 1,
    pages: [1, 2, 3, 4],
  }

  state = {
    pages: this.props.pages,
    activePage: this.props.activePage,
  }

  handlePageSelect = ({ pageNumber }) => {
    this.setState({ activePage: pageNumber });
  }

  handleNextPage = () => {
    const { activePage, pages } = this.state;
    const maxPage = pages[pages.length - 1];

    if (activePage < maxPage) {
      this.setState(prevState => ({ activePage: (prevState.activePage + 1) }));
    }
  }

  handlePrevPage = () => {
    const { activePage, pages } = this.state;
    const [minPage] = pages;

    if (activePage > minPage) {
      this.setState(prevState => ({ activePage: (prevState.activePage - 1) }));
    }
  }

  render() {
    const { pages, activePage } = this.state;

    return (
      <div className="pagination-root">
        <ul className="buttons">
          <li className="button">
            <GenericButton text="First" />
          </li>
          <li className="button">
            <GenericButton
              theme={{ transform: 'rotate(180deg)' }}
              icon={horizontalArrow}
              onClickEvent={this.handlePrevPage}
            />
          </li>
        </ul>

        <div>
          <Pages
            pages={pages}
            activePage={activePage}
            onPageSelect={this.handlePageSelect}
          />
        </div>

        <ul className="buttons">
          <li className="button">
            <GenericButton onClickEvent={this.handleNextPage} icon={horizontalArrow} />
          </li>
          <li className="button">
            <GenericButton text="Last" />
          </li>
        </ul>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Pagination;
