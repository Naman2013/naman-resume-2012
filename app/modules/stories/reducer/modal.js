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

export const setAndOpenModal = (state, { payload }) => ({
  ...state,
  modal: {
    ...state.modal,
    showModal: true,
    modalComponent: payload.modalComponent,
    modalStyles: payload.modalStyles,
    modalOnDismiss: payload.onDismissAction,
  },
});

export const closeModal = state => ({
  ...state,
  modal: {
    ...state.modal,
    showModal: false,
  },
});
