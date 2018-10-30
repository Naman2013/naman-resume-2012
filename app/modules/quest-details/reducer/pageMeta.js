export const fetchPageMetaStart = state => ({
  ...state,
});

export const fetchPageMetaSuccess = (state, { payload }) => {
  const {
    questIconURL,
    questId,
    questSubtitle,
    questTitle,
  } = payload;

  return {
    ...state,
    questIconURL,
    questId,
    questSubtitle,
    questTitle,
  };
};

export const fetchPageMetaFailure = state => ({
  ...state,
});
