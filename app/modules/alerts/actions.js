export const UPDATE_NOTIFICATION_COUNT = 'UPDATE_NOTIFICATION_COUNT';

const updateNotificationCountAction = payload => ({
  type: UPDATE_NOTIFICATION_COUNT,
  payload,
});

export const updateNotificationCount = payload => (dispatch) => {
  dispatch(updateNotificationCountAction(payload));
};
