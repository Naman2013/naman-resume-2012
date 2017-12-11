export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const RESET_PAGE_META = 'RESET_PAGE_META';

export const resetPageMeta = () => ({
  type: RESET_PAGE_META,
});

export const setPageTitle = title => ({
  type: SET_PAGE_TITLE,
  title,
});
