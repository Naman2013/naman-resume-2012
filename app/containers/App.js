import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import notificationStyles from '../components/common/notification-center/inline-styles';
import Menu from './Menu';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { checkUser } from '../modules/User';
import { validateUserPath } from '../utils/validateUserPath';

const { element, func } = PropTypes;

const mapStateToProps = ({ user }) => ({
  user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkUser,
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);

    this.notificationSystem = null;
  }

  componentWillMount() {
    this.props.checkUser();
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    validateUserPath(nextProps.location.pathname, this.props.user);
  }

  notify() {
    this.notificationSystem.addNotification({
      title: 'Test Message',
      message: 'Test Message',
      level: 'success',
      autoDismiss: 0,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={notificationStyles} />
        <Header />
        <Menu source="nav.json" />
        <section className="app-content-container clearfix">
          <div className="clearfix">
            {this.props.children}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: element,
  checkUser: func,
};

export default App;
