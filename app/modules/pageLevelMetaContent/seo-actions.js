export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_STANDARD_META = 'SET_STANDARD_META';
export const SET_OPEN_GRAPH_META = 'SET_OPEN_GRAPH_META';
export const RESET_PAGE_META = 'RESET_PAGE_META';

export const setOpenGraphMeta = payload => ({
  type: SET_OPEN_GRAPH_META,
  payload,
});

export const setStandardMeta = payload => ({
  type: SET_STANDARD_META,
  payload,
});

export const resetPageMeta = () => ({
  type: RESET_PAGE_META,
});

export const setPageTitle = title => ({
  type: SET_PAGE_TITLE,
  title,
});
