import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import Pages from './pages';
import style from './pagination.style';

const DEFAULT_ACTIVE_PAGE = 1;
const DEFAULT_PAGES_PER_PAGE = 4;

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
    onPageChange: PropTypes.func,
  }

  static defaultProps = {
    activePage: DEFAULT_ACTIVE_PAGE,
    pagesPerPage: DEFAULT_PAGES_PER_PAGE,
    totalPageCount: 10,
    pages: createPages(DEFAULT_ACTIVE_PAGE, DEFAULT_PAGES_PER_PAGE),
    onPageChange: () => { console.log('page changed'); },
  }

  state = {
    pages: this.props.pages,
    activePage: this.props.activePage,
  }

  // componentWillReceiveProps(nextProps) {
  //   const { activePage, pages  } = this.state;
  //   const { pagesPerPage, totalPageCount } = nextProps;
  //
  //   if (this.props.totalPageCount !== totalPageCount) {
  //     let firstPageInSet = activePage;
  //     let lastPageInSet = totalPageCount
  //
  //     if (activePage + pagesPerPage > totalPageCount) {
  //       lastPageInSet = totalPageCount - firstPageInSet;
  //     } else {
  //       lastPageInSet = firstPageInSet + pagesPerPage;
  //     }
  //
  //     if (firstPageInSet < 1) {
  //       firstPageInSet = 1;
  //     }
  //
  //     if (lastPageInSet > totalPageCount) {
  //       lastPageInSet = totalPageCount;
  //     }
  //     this.setState(() => {
  //       this.props.onPageChange({ activePage });
  //       return ({
  //         pages: createPages(firstPageInSet, (lastPageInSet - firstPageInSet)),
  //       });
  //     });
  //   }
  // }

  handlePageSelect = ({ pageNumber }) => {
    this.setState({ activePage: pageNumber });
    this.props.onPageChange({ activePage: pageNumber });
  }

  handleNextPage = () => {
    const { activePage, pages  } = this.state;
    const { pagesPerPage, totalPageCount } = this.props;
    const lastPageInSet = pages[pages.length - 1];
    const pageCount = ((totalPageCount - activePage) > pagesPerPage) ? pagesPerPage : (totalPageCount - activePage);
    if (activePage < lastPageInSet) {
      this.setState((prevState) => {
        const newPageNumber = (prevState.activePage + 1);
        this.props.onPageChange({ activePage: newPageNumber });
        return ({ activePage: newPageNumber });
      });
    }

    if (activePage === lastPageInSet && activePage < totalPageCount) {
      this.setState(() => {
        const newPageNumber = (lastPageInSet + 1);
        this.props.onPageChange({ activePage: newPageNumber });
        return ({
          pages: createPages((newPageNumber), pageCount),
          activePage: newPageNumber,
        });
      });
    }
  }

  handlePrevPage = () => {
    const { activePage, pages } = this.state;
    const { pagesPerPage } = this.props;
    const [firstPageInSet] = pages;
    if (activePage > firstPageInSet) {
      this.setState((prevState) => {
        const newPage = (prevState.activePage - 1);
        this.props.onPageChange({ activePage: newPage });
        return ({ activePage: newPage });
      });
    }

    if (activePage === firstPageInSet && activePage > 1) {
      this.setState(() => {
        const newPage = (firstPageInSet - 1);
        this.props.onPageChange({ activePage: newPage });
        return ({
          pages: createPages((firstPageInSet - (pagesPerPage)), pagesPerPage),
          activePage: newPage,
        });
      });
    }
  }

  handleFirstPage = () => {
    const { pagesPerPage } = this.props;
    const FIRST_PAGE = 1;
    this.setState({ pages: createPages(FIRST_PAGE, pagesPerPage), activePage: FIRST_PAGE });
    this.props.onPageChange({ activePage: FIRST_PAGE });
  }

  handleLastPage = () => {
    const { pagesPerPage, totalPageCount } = this.props;
    const lastPagePageCount = (totalPageCount % pagesPerPage);
    this.setState({
      pages: createPages(((totalPageCount - lastPagePageCount) + 1), lastPagePageCount),
      activePage: totalPageCount,
    });
    this.props.onPageChange({ activePage: totalPageCount });
  }

  render() {
    const { pages, activePage } = this.state;
    const { totalPageCount } = this.props;

    return (
      totalPageCount > 1 && (
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
      )
    );
  }
}

export default Pagination;
