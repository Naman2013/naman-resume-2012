/**
  @PageContent
  accepts an object with values and returns a full set of meta data
  here we store all default values and perform appropriate validation
*/

const DEFAULT_PAGE_TITLE = 'Slooh';

class PageContent {
  constructor({
    pageTitle,
  }) {
    this.pageTitle = pageTitle || DEFAULT_PAGE_TITLE;
  }
}

export default PageContent;
