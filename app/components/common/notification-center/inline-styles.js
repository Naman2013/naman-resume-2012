/**
  see https://github.com/igorprado/react-notification-system/blob/master/src/styles.js
  for list of all available style properties to overwrite when placing a NotificationSystem
  component
*/

export default {
  NotificationItem: {
    DefaultStyle: {
      padding: '40px',
      fontFamily: '"Brandon Grotesque", "brandon-grotesque", sans-serif',
      fontSize: '18px',
    },
    success: {
      background: 'rgba(0, 0, 0, 0.75)',
      color: 'white',
      borderTop: '2px solid #F310A7',
    },
  },
  Title: {
    DefaultStyle: {
      fontSize: '32px',
      marginBottom: '10px',
      fontWeight: 'normal',
    },
    success: {
      color: '#F310A7',
    },
  },
  Dismiss: {
    DefaultStyle: {
      fontSize: '32px',
      top: '15px',
      right: '15px',
      paddingTop: '5px',
      width: '24px',
      height: '24px',
      backgroundColor: 'transparent',
    },
  },
};
