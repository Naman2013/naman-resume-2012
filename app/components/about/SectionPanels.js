import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from '../common/CenterColumn';
import BobbieTile from '../common/tiles/BobbieTile';
import DisplayAtBreakpoint from '../common/DisplayAtBreakpoint';
import style from './SectionPanels.style';

const SectionPanels = ({ disableReadMore, list }) => (
  <CenterColumn>
    <ul style={{paddingTop: '40px'}}>
      {list.map(tile => (
        <li key={`about-panel-${tile.panelId}`}>
          <DisplayAtBreakpoint screenSmall>
            <BobbieTile
              showTitle={tile.showPanelTitle}
              title={tile.panelTitle}
              showSubtitle={tile.showPanelSubtitle}
              subtitle={tile.panelSubtitle}
              HTMLBlob={tile.content_device_small}
              disableReadMore={disableReadMore}
            />
          </DisplayAtBreakpoint>

          <DisplayAtBreakpoint screenMedium>
            <BobbieTile
              showTitle={tile.showPanelTitle}
              title={tile.panelTitle}
              showSubtitle={tile.showPanelSubtitle}
              subtitle={tile.panelSubtitle}
              HTMLBlob={tile.content_device_medium}
              disableReadMore={disableReadMore}
            />
          </DisplayAtBreakpoint>

          <DisplayAtBreakpoint screenLarge screenXLarge>
            <BobbieTile
              showTitle={tile.showPanelTitle}
              title={tile.panelTitle}
              showSubtitle={tile.showPanelSubtitle}
              subtitle={tile.panelSubtitle}
              HTMLBlob={tile.content_device_large}
              disableReadMore={disableReadMore}
            />
          </DisplayAtBreakpoint>
        </li>
      ))}
    </ul>
    <style jsx>{style}</style>
  </CenterColumn>
);

SectionPanels.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    showPanelTitle: PropTypes.bool.isRequired,
    showPanelSubtitle: PropTypes.bool.isRequired,
  })).isRequired,
};

export default SectionPanels;
