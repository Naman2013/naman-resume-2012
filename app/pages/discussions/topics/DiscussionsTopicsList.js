import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MissionAd from '../../../components/missions/mission-ad';

/*

  This page is currently not used. It should look identical to the main discussion page
  leaving it here as a placeholder
*/
const { func, array, number, object } = PropTypes;

class DiscussionsTopicsList extends Component {

  render() {
    return (
      <section className="discussions-topics clearfix">
        <div className="col-md-8 nopadding">
        </div>

        <div className="col-md-4 mission-sidebar">
          <MissionAd />
        </div>
      </section>
    );
  }
}

DiscussionsTopicsList.propTypes = {
};

const mapStateToProps = ({}) => ({
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsTopicsList);
