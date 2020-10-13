import React, { Component } from 'react';
import { TelescopeNav } from '../telescope-nav';
import { TelescopeDropdown } from '../telescope-dropdown';
import './styles.scss';
import { fetchMissionQuota, stopMissionQuotaTimer } from '../../../observatory-list/observatory-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MissionQuota } from '../slooh-1000/mission-quota';


// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       fetchMissionQuota,
//       stopMissionQuotaTimer,        
//     },
//     dispatch
//   );

// const mapStateToProps = (state) => ({
//   missionQuota: state.observatoryList.missionQuota
// });

// @connect(
//   mapStateToProps,
//   mapDispatchToProps
// )
export class TelescopeSetup extends Component {

  // componentDidMount(){
  //   this.props.fetchMissionQuota({ callSource: 'byTelescopeV4' });
  // }

  // componentWillUnmount(){
  //   this.props.stopMissionQuotaTimer();
  // }

  render() {
    const { selectedTelescope, telescopeList, setTelescope, setUpTelescopePrompt, missionQuota } = this.props;
    const { teleName, telescopeId } = selectedTelescope;

    return (
      <div className="telescope-setup">
        <div className="telescope-setup-nav">
          <div className="telescope-setup-telescope-info">
            {setUpTelescopePrompt} {teleName}
            {missionQuota && (
              <MissionQuota
                missionQuota={missionQuota}
              />
            )}
          </div>
          <TelescopeNav
            telescopeList={telescopeList}
            selectedTelescopeId={telescopeId}
            setTelescope={setTelescope}
          />
        </div>
        <div className="telescope-setup-dropdown">
          <div className="telescope-setup-telescope-info">
            Select a Telescope
          </div>
          <TelescopeDropdown
            telescopeList={telescopeList}
            selectedTelescope={selectedTelescope}
            onSelect={telescope => setTelescope(telescope, true)}
          />
        </div>
      </div>
    );
  }
}
