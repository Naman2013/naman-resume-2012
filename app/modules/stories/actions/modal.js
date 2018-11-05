export const SET_CREATE_STORIES_PAGE_MODAL = 'SET_CREATE_STORIES_PAGE_MODAL';
export const OPEN_CREATE_STORIES_PAGE_MODAL = 'OPEN_CREATE_STORIES_PAGE_MODAL';
export const CLOSE_CREATE_STORIES_PAGE_MODAL = 'CLOSE_CREATE_STORIES_PAGE_MODAL';
export const SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL = 'SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL';

const setAndOpenModal = payload => ({
  type: SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL,
  payload,
});

const setModal = payload => ({
  type: SET_CREATE_STORIES_PAGE_MODAL,
  payload,
});

const closeModal = () => ({
  type: CLOSE_CREATE_STORIES_PAGE_MODAL,
});

const openModal = () => ({
  type: OPEN_CREATE_STORIES_PAGE_MODAL,
});


export default {
  setAndOpenModal,
  setModal,
  closeModal,
  openModal,
};
