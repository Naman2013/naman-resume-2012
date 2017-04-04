import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { snapImage, resetImageToSnap } from '../../../modules/Telescope-Overview';

import s from './star-share-camera.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    snapImage,
    resetImageToSnap,
  }, dispatch),
});

const mapStateToProps = ({ telescopeOverview }) => ({
  snapshotList: telescopeOverview.snapshotList,
});

@connect(mapStateToProps, mapDispatchToProps)
class StarShareCamera extends Component {
  takeSnapshot = () => {
    this.props.actions.snapImage();
  }

  render() {
    return (
      <div className="star-share-camera-wrapper">
        <button onClick={this.takeSnapshot} className="snapshot-btn">
          <i className="fa fa-camera" />
        </button>
        {
          this.props.snapshotList.map((snapshot, i) => {
            return (
              <div key={`${i}_${snapshot.imageID}`} className="snapshot">
                <div className="snapshot-index">{i + 1}</div>
                {
                  snapshot.imageURL ? <img alt="" key={snapshot.imageID} src={snapshot.imageURL} /> : null
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default StarShareCamera;
