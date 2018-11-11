export const fetchStepStart = state => ({
  ...state,
});

export const fetchStepSuccess = (state, { payload }) => {
  return {
    ...state,
    step: {
      ...state.step,
      ...payload,
    },
  };
};

export const fetchStepFailure = state => ({
  ...state,
  step: {},
});
