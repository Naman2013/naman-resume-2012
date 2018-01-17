import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import PageMetaManagement from '../components/PageMetaManagement';
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

@connect(null, mapDispatchToProps)
class StaticAppContainer extends Component {
  constructor(props) {
    super(props);
    props.fetchEvents();
    this.notificationSystem = null;
    this.notifySuccess = this.notifySuccess.bind(this);
    this.notifyError = this.notifyError.bind(this);
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
    const { children } = this.props;
    const displayTitle = !!children.props.route.subTitle;
    const showContactButton = children.props.route.path !== 'contact';

    return (
      <div className="wrapper">
        <PageMetaManagement />
        <NotificationSystem ref="notificationSystem" style={notificationStyles} />
        <Header />
        <Menu />
        <section className="static-app-content-container clearfix">
          <div className="clearfix">
            <article className="static-page">
              {
                displayTitle ?
                  <header className="static">
                    <div className="pull-left">
                      <h1>{children.props.route.title || ''}</h1>
                      <h2 className="text-regular">{children.props.route.subTitle || ''}</h2>
                    </div>
                  </header> : null
              }
              {
                cloneElement(children, {
                  notification: {
                    success: this.notifySuccess,
                    error: this.notifyError,
                  },
                })
              }
            </article>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default StaticAppContainer;
