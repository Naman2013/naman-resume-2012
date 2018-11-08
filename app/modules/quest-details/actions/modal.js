export const SET_QUEST_DETAIL_PAGE_MODAL = 'SET_QUEST_DETAIL_PAGE_MODAL';
export const OPEN_QUEST_DETAIL_PAGE_MODAL = 'OPEN_QUEST_DETAIL_PAGE_MODAL';
export const CLOSE_QUEST_DETAIL_PAGE_MODAL = 'CLOSE_QUEST_DETAIL_PAGE_MODAL';
export const SET_AND_OPEN_QUEST_DETAIL_PAGE_MODAL = 'SET_AND_OPEN_QUEST_DETAIL_PAGE_MODAL';

const setAndOpenModal = payload => ({
  type: SET_AND_OPEN_QUEST_DETAIL_PAGE_MODAL,
  payload,
});

const setModal = payload => ({
  type: SET_QUEST_DETAIL_PAGE_MODAL,
  payload,
});

const closeModal = () => ({
  type: CLOSE_QUEST_DETAIL_PAGE_MODAL,
});

const openModal = () => ({
  type: OPEN_QUEST_DETAIL_PAGE_MODAL,
});


export default {
  setAndOpenModal,
  setModal,
  closeModal,
  openModal,
};
