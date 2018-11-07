import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { ColumnTabs } from 'components/common/Tabs';
import telescopeConfig from 'components/Telescope/telescopeConfig';
import FAUX_MISSIONS from 'content/fauxMissions';
import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
  TelescopeNavigation,
  TelescopeViewer,
} from 'components/telescope-details/v4-modules';
import style from './v4-telescope-details.style';

class TelescopeDetails extends Component {
  state = { selectedOption: 0 }
  handleOptionChange = (event) => {
    if (event.currentTarget.dataset.index) {
      this.setState({ selectedOption: event.currentTarget.dataset.index });
    } else {
      this.setState({ selectedOption: event.target.value });
    }
  }

  render() {
    return (
      <div>
        <TelescopeNavigation
          title="Great barred spiral galaxy"
          options={[
            { name: 'Canary one', thumbnailURL: 'https://polaris.slooh.com/teide/2/highmag/2018/10/24/0310_zetaaurigae/zetaaurigae_20181024_031235_0_wjwpsb_rgb.png' },
            { name: 'Canary two', thumbnailURL: 'https://polaris.slooh.com/chile/1/widefield/2018/10/23/0825_ic2599/ic2599_20181023_082645_0_yac71p_lrgb.png' },
            { name: 'Canary three', thumbnailURL: 'https://polaris.slooh.com/chile/1/highmag/2018/10/23/0805_ngc2362/ngc2362_20181023_080658_0_jdkoh8_lrgb.png' },
            { name: 'Chile', thumbnailURL: 'https://polaris.slooh.com/chile/1/highmag/2018/10/23/0755_waxinggibbousmoon/waxinggibbousmoon_20181023_075558_0_9nxhzu_b.png' },
          ]}
          onSelect={this.handleOptionChange}
          selectedIndex={this.state.selectedOption}
        />
        <div className="details-root">
          <DisplayAtBreakpoint screenLarge screenXLarge>
            <div className="viewer">
              <TelescopeViewer
                missionMetaData={FAUX_MISSIONS.nonMission}
                activeInstrumentID={telescopeConfig.CANARY_ONE_HALF_METER.instrumentID}
                previousInstrumentID={telescopeConfig.CANARY_TWO_WIDE_FIELD.instrumentID}
                increment={5}
              />
            </div>
          </DisplayAtBreakpoint>


          <div className="column">
            <ColumnTabs
              tabConfiguration={[
                {
                  tabTitle: 'Live',
                  content: () => (
                    <TabLive
                      missionMetaData={FAUX_MISSIONS.nonMission}
                      activeInstrumentID={telescopeConfig.CANARY_ONE_HALF_METER.instrumentID}
                      previousInstrumentID={telescopeConfig.CANARY_TWO_WIDE_FIELD.instrumentID}
                      increment={5}
                    />),
                  },
                { tabTitle: 'Queue', content: () => (<TabQueue />) },
                { tabTitle: 'Cond.', content: () => (<TabConditions />) },
                { tabTitle: 'Scope', content: () => (<TabTelescope />) },
              ]}
            />
          </div>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => (bindActionCreators({}));
const ConnectedTelescopeDetails = connect(mapStateToProps, mapDispatchToProps)(TelescopeDetails);

export { TelescopeDetails, ConnectedTelescopeDetails };
