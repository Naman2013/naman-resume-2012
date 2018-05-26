export const UPDATE_NOTIFICATIONS_COUNT = 'UPDATE_NOTIFICATIONS_COUNT';

const updateNotificationsCountAction = payload => ({
  type: UPDATE_NOTIFICATIONS_COUNT,
  payload,
});

export const updateNotificationsCount = payload => (dispatch) => {
  dispatch(updateNotificationsCountAction(payload));
};
