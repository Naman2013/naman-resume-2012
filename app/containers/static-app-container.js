import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageMetaManagement from '../components/PageMetaManagement';
import GlobalNavigation from '../components/GlobalNavigation';
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

    return (
      <div className="wrapper">
        <PageMetaManagement />
        <GlobalNavigation />
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
