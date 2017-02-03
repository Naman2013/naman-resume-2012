import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import MissionAd from '../../components/missions/mission-ad';
import * as objectPostActions from '../../modules/object-post-list/actions';

const tag = 'The Moon';

class ObjectListWrapper extends Component {

  render() {
    const {
      children,
      fetching,
      fetchObjectPosts,
      objectPosts,
      pages,
      route: { path }
    } = this.props;

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">
          {
            fetching ? <GenericLoadingBox /> : cloneElement(children, {
              objectPosts,
              pages,
              fetchObjectPosts,
              path,
            })
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          <MissionAd />
        </div>

      </section>
    );
  }
}

ObjectListWrapper.defaultProps = {
  fetching: true,
};

ObjectListWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  fetching: PropTypes.bool,
  objectPosts: PropTypes.array.isRequired,
  fetchObjectPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ objectPostList }) => ({ ...objectPostList });
const mapDispatchToProps = dispatch => (bindActionCreators(objectPostActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ObjectListWrapper);
