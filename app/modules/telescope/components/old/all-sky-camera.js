import AllSkyTimelapseWidget from 'app/components/telescope-details/allsky-timelapse-widget';
import { fetchAllSkyAction } from 'app/modules/Telescope-Overview';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import './all-sky-camera.scss';
import { ImagePortalViewer } from './index';
import { ModuleContainer } from './module-container';

class AllSkyCamera extends Component {
  state = {
    isModalOpen: false,
    isTimelapseExpanded: false,
  };

  componentDidUpdate(prevProps) {
    const { allSkyWidgetID } = prevProps;
    if (allSkyWidgetID !== this.props.allSkyWidgetID) {
      this.updateAllSky();
    }
  }

  updateAllSky() {
    const { fetchAllSkyAction, obsId, allSkyWidgetID } = this.props;
    if (allSkyWidgetID) {
      fetchAllSkyAction({
        obsId,
        AllskyWidgetId: allSkyWidgetID,
      });
    }
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  renderAllSkyTimelapseCollapsible = () => {
    const { obsId, AllskyTimelapseWidgetId } = this.props;
    const { isTimelapseExpanded } = this.state;
    return (
      <div className="action">
        <Button
          className="open-timelapse"
          onClick={() =>
            this.setState({ isTimelapseExpanded: !isTimelapseExpanded })
          }
          aria-controls="open all sky timelapse"
          aria-expanded={isTimelapseExpanded}
        >
          {isTimelapseExpanded ? 'Close' : 'Open'} Timelapse
        </Button>

        <Collapse in={isTimelapseExpanded} mountOnEnter unmountOnExit>
          <div id="example-collapse-text">
            <AllSkyTimelapseWidget
              obsId={obsId}
              AllskyTimelapseWidgetId={AllskyTimelapseWidgetId}
            />
          </div>
        </Collapse>
      </div>
    );
  };

  render() {
    const {
      allSkyWidgetID,
      imageURL,
      title,
      AllskyTimelapseWidgetId,
    } = this.props;
    if (!allSkyWidgetID) return null;
    const { isModalOpen } = this.state;

    return (
      <div className="root all-sky-camera">
        <ModuleContainer title="All sky camera">
          <ImagePortalViewer
            imageURL={imageURL}
            title={title}
            onClick={this.openModal}
          />
          {AllskyTimelapseWidgetId
            ? this.renderAllSkyTimelapseCollapsible()
            : null}
        </ModuleContainer>

        <ModalImg
          isOpen={isModalOpen}
          imageURL={imageURL}
          onHide={this.closeModal}
        />
      </div>
    );
  }
}

AllSkyCamera.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string,
  fetchAllSkyAction: PropTypes.func.isRequired,
  obsId: PropTypes.string.isRequired,
  allSkyWidgetID: PropTypes.string.isRequired,
};

AllSkyCamera.defaultProps = {
  title: '',
};

const mapStateToProps = ({ telescopeOverview: { allSkyWidgetResult } }) => ({
  imageURL: allSkyWidgetResult.allSkyCamURL,
  title: allSkyWidgetResult.title,
});

const mapDispatchToProps = {
  fetchAllSkyAction,
};

const ConnectedAllSkyCamera = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSkyCamera);

export { AllSkyCamera, ConnectedAllSkyCamera };
