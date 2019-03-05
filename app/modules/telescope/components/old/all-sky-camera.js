import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllSkyAction } from 'modules/Telescope-Overview';
import { ImagePortalViewer } from './index';
import { ModuleContainer } from './module-container';

class AllSkyCamera extends Component {
  constructor(props) {
    super(props);
    this.updateAllSky(props);
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

  render() {
    const { imageURL, description } = this.props;

    return (
      <div className="root">
        <ModuleContainer title="All sky camera snap">
          <ImagePortalViewer
            imageURL={imageURL}
            description={description}
          />
        </ModuleContainer>
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

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchAllSkyAction,
}, dispatch));

const ConnectedAllSkyCamera = connect(mapStateToProps, mapDispatchToProps)(AllSkyCamera);

export { AllSkyCamera, ConnectedAllSkyCamera };
