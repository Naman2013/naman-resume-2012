import { API } from 'app/api';

export const UPDATE_NOTIFICATIONS_COUNT = 'UPDATE_NOTIFICATIONS_COUNT';

const updateNotificationsCountAction = payload => ({
  type: UPDATE_NOTIFICATIONS_COUNT,
  payload,
});

export const updateNotificationsCount = payload => dispatch =>
  dispatch(updateNotificationsCountAction(payload));

export const dismissNotification = ({ eventId, lang, ver }) => (
  dispatch,
  getState
) => {
  const { cid, at, token } = getState().user;
  const { notificationsCount } = getState().alerts;
  return API.post('/api/notify/markAsRead', {
    at,
    cid,
    eventId,
    lang,
    token,
    ver,
  }).then(result => {
    dispatch(
      updateNotificationsCount({
        count: notificationsCount - 1,
      })
    );
    return Object.assign({ eventId }, result.data);
  });
};
