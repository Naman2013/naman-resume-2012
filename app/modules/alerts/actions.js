import axios from 'axios';

export const UPDATE_NOTIFICATIONS_COUNT = 'UPDATE_NOTIFICATIONS_COUNT';
export const DISMISS_NOTIFICATION_SUCCESS = 'DISMISS_NOTIFICATION_SUCCESS';

const updateNotificationsCountAction = payload => ({
  type: UPDATE_NOTIFICATIONS_COUNT,
  payload,
});

export const updateNotificationsCount = payload => (dispatch) => {
  dispatch(updateNotificationsCountAction(payload));
};

const dismissNotificationSuccess = payload => ({
  type: DISMISS_NOTIFICATION_SUCCESS,
  payload,
});

export const dismissNotification = ({
  eventId,
  lang,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { notificationsCount } = getState().alerts;
  return axios.post('/api/notify/markAsRead', {
    at,
    cid,
    eventId,
    lang,
    token,
    ver,
  })
    .then((result) => {
      dispatch(updateNotificationsCount({
        count: notificationsCount - 1,
      }));
      return dispatch(dismissNotificationSuccess(Object.assign({ eventId }, result.data)));
    });
};
