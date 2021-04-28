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
import { fetchEvents, setPublicCardStatusAction } from '../modules/upcoming-events/upcoming-events-actions';
import { fetchList } from '../modules/observatory-list/observatory-actions';
import { fireSloohPageView, veritySloohId } from 'app/utils/slooh-pageview-wrapper';
import QuestBreadCrumb from '../components/GlobalNavigation/breadcrumb';
import { getUserInfo } from 'app/modules/User';

import { PublicProfileCard } from 'app/modules/new-dashboard/components/public-card';
import Popup from 'react-modal';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';
import publicProfile from 'app/modules/profile/containers/public-profile';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchEvents,
      setPublicCardStatusAction,
      fetchList,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { isLanding} = state;
  const { showPublicCard, customerUUID } = state.upcomingEvents;  
  return {
    isLanding,
    user: makeUserSelector()(state),
    showPublicCard,
    customerUUID,
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
    props.fetchList();
  }

  // async componentWillMount(){
  //   const res1=await veritySloohId();  
  // }

  async componentDidMount(){
    const { user } = this.props;
    const res = await (initSessionToken(user,this));
    this.setState({isSessionInitialized: res});
    const {
      location: { pathname },
    } = this.props;
    // Slooh page view tracker for application load event
    fireSloohPageView({ pagePath: pathname }); 
    const res1=await veritySloohId();     
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
      

     // Slooh page view tracker when route changes
     fireSloohPageView({ pagePath: currentPathname, referringPageURL: pathname });    
    }
  }

  render() {
    const { isLanding, showPublicCard, customerUUID, setPublicCardStatusAction } = this.props;
    const { isSessionInitialized } = this.state;
    const { sloohQuestBreadCrumbQuestTitle, sloohQuestBreadCrumbQuestLinkURL } = getUserInfo();
    
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
              <GlobalNavigation 
                fetchEvents={this.props.fetchEvents}
              />
              <QuestBreadCrumb
                sloohQuestBreadCrumbQuestTitle={sloohQuestBreadCrumbQuestTitle}
                sloohQuestBreadCrumbQuestLinkURL={sloohQuestBreadCrumbQuestLinkURL}
              />
            </nav>
            
            <section className="app-content-container clearfix v4" style={{marginTop: (sloohQuestBreadCrumbQuestLinkURL ? "85px" : "60px")}}>
              <div className="clearfix">{this.props.children}</div>
            </section>

            {showPublicCard && (
              <Popup
                id={"publicProfile"}
                ariaHideApp={false}
                isOpen={true}
                style={customModalStylesPublicProfileCardBlueOverlay}
                contentLabel="Public Profile"
                shouldCloseOnOverlayClick={false}
                onRequestClose={()=>setPublicCardStatusAction(null, false)}
                >   
                  <PublicProfileCard
                    customerUUID={customerUUID}
                    onClose={()=>setPublicCardStatusAction(null, false)}
                  />
              </Popup>
              )}

            <Footer />
          </DeviceProvider>
             :null}
          <style jsx>
            {`
              .v4 {
                margin-top: 60px;
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
