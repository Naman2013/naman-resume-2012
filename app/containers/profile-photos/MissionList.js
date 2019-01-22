import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DeviceContext } from 'providers/DeviceProvider';
import MissionCard from 'components/profile-photos/MissionCard';
import { fetchMissionsAndCounts } from 'modules/my-pictures/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
  }, dispatch),
});

const mapStateToProps = ({ myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionList extends Component {
  componentDidMount() {
    this.props.actions.fetchMissionsAndCounts({});
  }

  render() {
    const { imageList } = this.props;
    return imageList.length !== 0 ? (
      <DeviceContext.Consumer>
        {
          context => (
            <Fragment>
              <div className="root" style={{ justifyContent: context.isDesktop ? 'normal' : 'space-between' }}>
                {imageList.length > 0 && imageList.map((mission, i) => (
                  <MissionCard
                    key={mission.imageId}
                    isDesktop={context.isDesktop}
                    isMobile={context.isMobile}
                    index={i}
                    mission={mission}
                  />
                ))}
              </div>
              <style jsx>
                {`
                  .root {
                    display: flex;
                    flex-wrap: wrap;
                  }
                `}
              </style>
            </Fragment>
          )
        }
      </DeviceContext.Consumer>
    ) : (
      <div>Loading</div>
    );
  }
}

MissionList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    fetchMissionsAndCounts: PropTypes.func,
  }).isRequired,
};

export default MissionList;
