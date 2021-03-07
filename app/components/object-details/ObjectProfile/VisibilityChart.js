import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './VisibilityChart.style';
import Popup from 'react-modal';
import { customModalStylesChartPopupBlueOverlay } from 'app/styles/mixins/utilities';
import { Button } from 'app/modules/new-dashboard/components/button';

const TELESCOPE_INDEX = 'data-telescope-index';

class VisibilityChart extends Component {
  static propTypes = {
    observatory: PropTypes.arrayOf(
      PropTypes.shape({
        buttonLabel: PropTypes.string.isRequired,
        chartURL: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
      })
    )
  };

  static defaultProps = { observatory: [] };

  state = {
    activeobservatory: 0,
    showChartPopup: false,
  };

  updateActiveTelescope = event => {
    this.setState({
      activeobservatory: parseInt(event.target.getAttribute(TELESCOPE_INDEX), 10),
    });
  };

  render() {
    const { activeobservatory, showChartPopup } = this.state;
    const { observatory } = this.props;
    const telescope = observatory[activeobservatory];
    return (
      <div className="visibility-div">
        <ul className="navigation">
          {observatory.map((obs, index) => (
            <li key={`best-telescopes-${obs.buttonLabel}`}>
              <button
                className={classnames('action-tab', {
                  active: activeobservatory === index,
                })}
                onClick={this.updateActiveTelescope}
                data-telescope-index={index}
              >
                {obs.buttonLabel}
              </button>
            </li>
          ))}
        </ul>
        <img 
          onClick={()=>this.setState({showChartPopup: true})}
          className={"enlarge-button"}
          src={"https://vega.slooh.com/assets/v4/dashboard-new/dock_undock.svg"} 
        />
        <iframe
          className="chart-div"
          src={telescope.chartURL}
          id="chart-24"
        />        

        <Popup
          ariaHideApp={false}
          isOpen={showChartPopup}
          style={customModalStylesChartPopupBlueOverlay}
          contentLabel="Chart Popup"
          shouldCloseOnOverlayClick={false}
          onRequestClose={()=>this.setState({showChartPopup: false})}
        >   
          <div className="new-dash">
            <div className="profilecard-header">
              <h2 className="title-heading"></h2> 
              <Button
                type={"button"}
                onClickEvent={()=>this.setState({showChartPopup: false})} 
                text={"Close"}                                             
                style={"public-card-close-button"}
                icon={"https://vega.slooh.com/assets/v4/dashboard-new/close_slooh_blue.svg"}
              />
            </div>
            <br/>
            <iframe
              className="chart-div"
              src={telescope.chartURL}
            /> 
          </div>          
        </Popup>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default VisibilityChart;
