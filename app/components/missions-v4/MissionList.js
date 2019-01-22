import React, { Component, Fragment } from 'react';
import { DeviceContext } from 'providers/DeviceProvider';

import MissionCard from './MissionCard';

const arr = [1, 2, 3, 4, 5];

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMissionsAndCounts } from '../../modules/my-pictures/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionsAndCounts,
  }, dispatch),
});

const mapStateToProps = ({ user, myPictures }) => ({
  imageList: myPictures.missions.response.imageList,
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionList extends Component {
  componentDidMount() {
    this.props.actions.fetchMissionsAndCounts({});
  }
  render() {
    console.log(this.props.imageList);
    const { imageList } = this.props;
    return (
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
    );
  }
}



export default MissionList;
