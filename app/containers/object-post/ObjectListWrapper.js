import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import MissionAd from '../../components/missions/mission-ad';

const mapStateToProps = ({ objectPostList }) => ({
  fetchingPosts: objectPostList.fetching,
  objectPosts: objectPostList.objectPosts,
  pages: objectPostList.pages,
});

@connect(mapStateToProps)
class ObjectListWrapper extends Component {

  render() {
    const {
      children,
      fetchingPosts,
      objectPosts,
      pages,
      route: { path }
    } = this.props;

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">
          {
            fetchingPosts ? <GenericLoadingBox /> : cloneElement(children, {
              objectPosts,
              pages,
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
  fetchingPosts: true,
};

ObjectListWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  fetchingPosts: PropTypes.bool,
};

export default ObjectListWrapper;
