export const fetchPageMetaStart = state => ({
  ...state,
});

export const fetchPageMetaSuccess = (state, { payload }) => {
  return {
    ...state,
    pageMeta: {
      ...state.pageMeta,
      ...payload,
    },
  };
};

export const fetchPageMetaFailure = state => ({
  ...state,
  pageMeta: {},
});
