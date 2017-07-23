import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import notificationStyles from '../components/common/notification-center/inline-styles';
import Menu from './Menu';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { fetchEvents } from '../modules/upcoming-events/upcoming-events-actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEvents,
  }, dispatch);
}

function mapStateToProps({ isLanding }) {
  return {
    isLanding,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);
    props.fetchEvents();
    this.notificationSystem = null;
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  notifySuccess({ title, message }) {
    this.notificationSystem.addNotification({
      title,
      message,
      level: 'success',
      autoDismiss: 0,
    });
  }

  notifyError({ title, message }) {
    this.notificationSystem.addNotification({
      title,
      message,
      level: 'error',
      autoDismiss: 0,
    });
  }

  render() {
    const { isLanding } = this.props;
    return (
      <div className={`wrapper ${isLanding ? 'is-landing' : null}`}>
        <NotificationSystem ref="notificationSystem" style={notificationStyles} />
        <Header />
        <Menu source="nav.json" />
        <section className="app-content-container clearfix">
          <div className="clearfix">
            {
              cloneElement(this.props.children, {
                notification: {
                  success: this.notifySuccess,
                  error: this.notifyError,
                },
              })
            }
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
