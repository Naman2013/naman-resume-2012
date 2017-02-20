import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import notificationStyles from '../components/common/notification-center/inline-styles';
import Menu from './Menu';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { checkUser } from '../modules/User';

const { element, func } = PropTypes;

const mapStateToProps = ({ user }) => ({
  user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkUser }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class StaticAppContainer extends Component {
  static propTypes = {
    children: element,
    checkUser: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.notificationSystem = null;
    this.notifySuccess = this.notifySuccess.bind(this);
    this.notifyError = this.notifyError.bind(this);
  }

  componentWillMount() {
    // this.props.checkUser();
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
                    {showContactButton && <Link to="/about/contact" className="btn-primary pull-right">Contact Us</Link>}
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
