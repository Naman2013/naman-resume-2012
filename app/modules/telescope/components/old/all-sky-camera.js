import { fetchAllSkyAction } from 'app/modules/Telescope-Overview';
import AllSkyTimelapse from 'app/modules/telescope/containers/all-sky-timelapse';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, Collapse } from 'react-bootstrap';
import { Magnifier } from 'react-image-magnifiers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './all-sky-camera.scss';
import { ImagePortalViewer } from './index';
import { ModuleContainer } from './module-container';

class AllSkyCamera extends Component {
  constructor(props) {
    super(props);
    this.updateAllSky(props);
    this.state = {
      isModalOpen: false,
      isTimelapseExpanded: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { allSkyWidgetID } = prevProps;
    if (allSkyWidgetID !== this.props.allSkyWidgetID) {
      this.updateAllSky(this.props);
    }
  }

  updateAllSky({ obsId, allSkyWidgetID }) {
    if (allSkyWidgetID) {
      this.props.fetchAllSkyAction({
        obsId,
        AllskyWidgetId: allSkyWidgetID,
      });
    }
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  renderAllSkyTimelapseCollapsible = () => {
    const { obsId, allSkyWidgetID } = this.props;
    const { isTimelapseExpanded } = this.state;
    return (
      <div className="text-center">
        <Button
          className="open-timelapse"
          onClick={() =>
            this.setState({ isTimelapseExpanded: !isTimelapseExpanded })
          }
          aria-controls="open all sky timelapse"
          aria-expanded={isTimelapseExpanded}
        >
          Open Timelapse
        </Button>

        <Collapse in={isTimelapseExpanded} mountOnEnter unmountOnExit>
          <div id="example-collapse-text">
            <AllSkyTimelapse obsId={obsId} widgetUniqueId={allSkyWidgetID} />
          </div>
        </Collapse>
      </div>
    );
  };

  render() {
    const { imageURL, description, allSkyWidgetID } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div className="root all-sky-camera">
        <ModuleContainer title="All sky camera snap">
          <ImagePortalViewer
            imageURL={imageURL}
            description={description}
            onClick={this.openModal}
          />
          {allSkyWidgetID ? this.renderAllSkyTimelapseCollapsible() : null}
        </ModuleContainer>

        <Modal size="lg" centered show={isModalOpen} onHide={this.closeModal}>
          <Modal.Body>
            <Magnifier imageSrc={imageURL} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

AllSkyCamera.propTypes = {
  imageURL: PropTypes.string.isRequired,
  description: PropTypes.string,
  fetchAllSkyAction: PropTypes.func.isRequired,
  obsId: PropTypes.string.isRequired,
  allSkyWidgetID: PropTypes.string.isRequired,
};

AllSkyCamera.defaultProps = {
  description: 'Restibulum rutrum quameli mitae fringilla lorem ipsum.',
  fetchAllSkyAction: () => {},
};

const mapStateToProps = ({ telescopeOverview: { allSkyWidgetResult } }) => ({
  imageURL: allSkyWidgetResult.allSkyCamURL,
  description: allSkyWidgetResult.title,
});

const mapDispatchToProps = {
  fetchAllSkyAction,
};

const ConnectedAllSkyCamera = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSkyCamera);

export { AllSkyCamera, ConnectedAllSkyCamera };
