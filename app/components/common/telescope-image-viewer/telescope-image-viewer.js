import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import TelescopeImageLoader from '../telescope-image-loader/telescope-image-loader';
import style from './telescope-image-viewer.scss';

import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';

class TelescopeImageViewer extends Component {

  render() {
    const {
      telePort,
      teleSystem,
      teleId,
      teleFade } = this.props;

    const setIds = obsIdTeleIdDomeIdFromTeleId(teleId);

    const teleThumbWidth = '866px';
    const imageSource = generateSseImageLoader(teleSystem, telePort);

    return (
      <div
        className="telescope-image-viewer"
      >

        <InteractiveViewer>

          <TelescopeImageLoader
            imageSource={imageSource}
            teleId={setIds.teleId}
            obsId={setIds.obsId}
            domeId={setIds.domeId}
            teleThumbWidth={teleThumbWidth}
            teleFade={teleFade}
            clipped={false}
            missionFormat="full"
          />

        </InteractiveViewer>

      </div>
    );
  }
}

TelescopeImageViewer.defaultProps = {
  clipped: false,
};

TelescopeImageViewer.propTypes = {
  clipped: PropTypes.bool,
};

export default TelescopeImageViewer;
