import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import Pages from './pages';
import style from './pagination.style';

function createPages(pageStart = 0, numberOfPages) {
  const pages = [];
  for (let i = 0; i < numberOfPages; i += 1) {
    pages.push((pageStart + i));
  }

  return pages;
}


class Pagination extends Component {
  static propTypes = {
    activePage: PropTypes.number,
    pagesPerPage: PropTypes.number,
    totalPageCount: PropTypes.number,
    pages: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    activePage: 1,
    pagesPerPage: 4,
    totalPageCount: 10,
    pages: [1, 2, 3, 4],
  }

  state = {
    pages: this.props.pages,
    activePage: this.props.activePage,
    totalPageCount: this.props.totalPageCount,
  }

  handlePageSelect = ({ pageNumber }) => {
    this.setState({ activePage: pageNumber });
  }

  handleNextPage = () => {
    const { activePage, pages, totalPageCount } = this.state;
    const { pagesPerPage } = this.props;
    const lastPageInSet = pages[pages.length - 1];
    const pageCount = ((totalPageCount - activePage) > pagesPerPage) ? pagesPerPage : (totalPageCount - activePage);
    if (activePage < lastPageInSet) {
      this.setState(prevState => ({ activePage: (prevState.activePage + 1) }));
    }

    if (activePage === lastPageInSet && activePage < totalPageCount) {
      this.setState(() => ({
        pages: createPages((lastPageInSet + 1), pageCount),
        activePage: (lastPageInSet + 1),
      }));
    }
  }

  handlePrevPage = () => {
    const { activePage, pages } = this.state;
    const [minPage] = pages;

    if (activePage > minPage) {
      this.setState(prevState => ({ activePage: (prevState.activePage - 1) }));
    }
  }

  handleFirstPage = () => {
    const { pagesPerPage } = this.props;
    const FIRST_PAGE = 1;
    this.setState({ pages: createPages(FIRST_PAGE, pagesPerPage), activePage: FIRST_PAGE });
  }

  handleLastPage = () => {
    const { totalPageCount } = this.state;
    const { pagesPerPage } = this.props;
    const lastPagePageCount = (totalPageCount % pagesPerPage);
    this.setState({
      pages: createPages(((totalPageCount - lastPagePageCount) + 1), lastPagePageCount),
      activePage: totalPageCount,
    });
  }

  render() {
    const { pages, activePage } = this.state;

    return (
      <div className="pagination-root">
        <ul className="buttons">
          <li className="button">
            <GenericButton
              text="First"
              onClickEvent={this.handleFirstPage}
            />
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
            <GenericButton
              text="Last"
              onClickEvent={this.handleLastPage}
            />
          </li>
        </ul>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Pagination;
