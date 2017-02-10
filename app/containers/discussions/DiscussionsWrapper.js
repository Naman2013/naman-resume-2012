import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiscussionsNav from '../../components/discussions/DiscussionsNav';
import MissionAd from '../../components/missions/mission-ad';
import * as threadActions from '../../modules/discussions-thread/actions';

const { func } = PropTypes;
class DiscussionsWrapper extends Component {

  render() {
    const { children } = this.props;
    return (
      <div className="discussions-wrapper container-fluid">
        <DiscussionsNav />
        <div className="row">
          <div className="col-md-8">
            {children}
          </div>
          <div className="col-md-4">
            <MissionAd />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ discussionsThread }) => ({
  ...discussionsThread,
});
const mapDispatchToProps = dispatch => (bindActionCreators(threadActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsWrapper);
