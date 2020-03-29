import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeviceProvider from 'providers/DeviceProvider';
import IssueWithUserAccount from 'app/modules/account-settings/containers/issue-with-user-account';
import { initSessionToken } from 'app/utils/session';
import { makeUserSelector } from 'app/modules/user/selectors';
import PageMetaManagement from '../components/PageMetaManagement';

import GlobalNavigation from '../components/GlobalNavigation';

import Footer from '../components/Footer';
import { fetchEvents } from '../modules/upcoming-events/upcoming-events-actions';

import { fireSloohPageView } from 'app/utils/slooh-pageview-wrapper';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchEvents,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { isLanding} = state;

  return {
    isLanding,    
    user: makeUserSelector()(state),
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
  static propTypes = {
    isSessionInitialized: PropTypes.bool,
    isLanding: PropTypes.bool,
    children: PropTypes.node.isRequired,
    fetchEvents: PropTypes.func.isRequired,    
  };

  static defaultProps = {
    isLanding: false,
    isSessionInitialized: false,
  };
  state={   
    isSessionInitialized: false,
  }
  
  constructor(props) {
    super(props);
    props.fetchEvents();
    const {
      location: { pathname },
    } = this.props;

    // Slooh page view tracker for application load event
    fireSloohPageView({ pagePath: pathname });
  }

  async componentDidMount(){    
    const { user } = this.props; 
    const res = await (initSessionToken(user,this));
    this.setState({isSessionInitialized: res});
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: { pathname },      
    } = this.props;    
    const {
      location: { pathname: currentPathname },
    } = nextProps;

    const routeChanged = pathname !== currentPathname;

    if (routeChanged) {
      //console.log(pathname);
      //console.log(currentPathname);
  
     // Slooh page view tracker when route changes
     fireSloohPageView({ pagePath: currentPathname, referringPageURL: pathname });
    }
  }

  render() {
    const { isLanding } = this.props;
    const { isSessionInitialized } = this.state;    
    return (
      <Suspense fallback={<div>Loading</div>}>
        
        <div
          style={{ overflow: 'hidden' }}
          className={`wrapper ${isLanding  ? 'is-landing' : null}`}
        >
          {isSessionInitialized? 
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
             :null} 
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
      </Suspense>
    );
  }
}

export default App;
