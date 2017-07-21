import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModalGeneric from '../../../components/common/modals/modal-generic';
import { snapImage, resetImageToSnap, resetsnapImageMsg } from '../../../modules/Telescope-Overview';

import './star-share-camera.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    snapImage,
    resetImageToSnap,
    resetsnapImageMsg,
  }, dispatch),
});

const mapStateToProps = ({ telescopeOverview }) => ({
  snapshotList: telescopeOverview.snapshotList,
  snapshotMsg: telescopeOverview.snapshotMsg,
});

@connect(mapStateToProps, mapDispatchToProps)
class StarShareCamera extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      snapImage: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
      resetsnapImageMsg: PropTypes.func.isRequired,
    }).isRequired,
    snapshotMsg: PropTypes.string,
  };

  static defaultProps = {
    snapshotMsg: '',
  };

  state = {
    openedModal: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.snapshotMsg !== nextProps.snapshotMsg) {
      this.openModal();
    }
  }

  takeSnapshot = () => {
    this.props.actions.snapImage();
  }

  openModal = () => {
    this.setState({
      openedModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      openedModal: false,
    });
    this.props.actions.resetsnapImageMsg();
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
        {this.props.snapshotMsg && <ModalGeneric
          open={this.state.openedModal}
          closeModal={this.closeModal}
          description={String(this.props.snapshotMsg)}
        />}
      </div>
    );
  }
}

export default StarShareCamera;
