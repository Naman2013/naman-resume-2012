export const setModal = (state, { payload }) => ({
  ...state,
  modal: {
    ...state.modal,
    modalComponent: payload.modalComponent,
    modalStyles: payload.modalStyles,
  },
});

export const openModal = state => ({
  ...state,
  modal: {
    ...state.modal,
    showModal: true,
  },
});

export const closeModal = state => ({
  ...state,
  modal: {
    ...state.modal,
    showModal: false,
  },
});
