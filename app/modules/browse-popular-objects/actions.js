export const SET_SELECTED_CATEGORY_INDEX = 'SET_SELECTED_CATEGORY_INDEX';
export const SET_SELECTED_OBJECT_INDEX = 'SET_SELECTED_OBJECT_INDEX';

export const RESET_RESERVE_BY_OBJECT = 'RESET_RESERVE_BY_OBJECT';

export const resetBrowseByPopularObjects = () => ({
  type: RESET_RESERVE_BY_OBJECT,
});

export const setCategoryIndex = payload => ({
  type: SET_SELECTED_CATEGORY_INDEX,
  payload,
});

export const setObjectIndex = payload => ({
  type: SET_SELECTED_OBJECT_INDEX,
  payload,
});
