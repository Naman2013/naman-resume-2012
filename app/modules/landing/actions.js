export const ENABLE_LANDING = 'ENABLE_LANDING';
export const DISABLE_LANDING = 'DISABLE_LANDING';

const enableLanding = () => ({
  type: ENABLE_LANDING,
  isLanding: true,
});

const disableLanding = () => ({
  type: DISABLE_LANDING,
  isLanding: false,
});

export const onEnterLanding = ({ dispatch }) => () => {
  dispatch(enableLanding());
};

export const onLeaveLanding = ({ dispatch }) => () => {
  dispatch(disableLanding());
};
