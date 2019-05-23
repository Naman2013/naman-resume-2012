import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeviceProvider from 'providers/DeviceProvider';
import IssueWithUserAccount from 'app/modules/account-settings/containers/issue-with-user-account';
import PageMetaManagement from '../components/PageMetaManagement';

import GlobalNavigation from '../components/GlobalNavigation';

import Footer from '../components/Footer';
import { fetchEvents } from '../modules/upcoming-events/upcoming-events-actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchEvents,
    },
    dispatch
  );
}

function mapStateToProps({ isLanding }) {
  return {
    isLanding,
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,
    children: PropTypes.node.isRequired,
    fetchEvents: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLanding: false,
  };

  constructor(props) {
    super(props);
    props.fetchEvents();
  }

  render() {
    const { isLanding } = this.props;
    return (
      <div
        style={{ overflow: 'hidden' }}
        className={`wrapper ${isLanding ? 'is-landing' : null}`}
      >
        <DeviceProvider>
          <PageMetaManagement />

          <IssueWithUserAccount />

          <nav className="navigation">
            <GlobalNavigation />
          </nav>

          <section className="app-content-container clearfix v4">
            <div className="clearfix">{this.props.children}</div>
          </section>
          <Footer />
        </DeviceProvider>
        <style jsx>
          {`
            .v4 {
              margin-top: 60px !important;
              position: relative;
              z-index: 1;
            }
            .navigation {
              position: relative;
              z-index: 10;
            }
          `}
        </style>
      </div>
    );
  }
}

export default App;
