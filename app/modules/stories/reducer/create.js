export const submitStoryStart = state => ({
  ...state,
  create: {},
});

export const submitStorySuccess = (state, { payload }) => {

  return {
    ...state,
    create: {
      ...state.create,
      ...payload,
    },
  };
};

export const submitStoryFailure = state => ({
  ...state,
  create: {},
});
