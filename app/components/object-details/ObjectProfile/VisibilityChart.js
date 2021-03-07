import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './VisibilityChart.style';

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
  };

  updateActiveTelescope = event => {
    this.setState({
      activeobservatory: parseInt(event.target.getAttribute(TELESCOPE_INDEX), 10),
    });
  };

  onIframeLoad = () => {
    debugger;
    document.getElementById("chart-24").contentWindow.document.body.onclick = () => {
      debugger;
      console.log("Iframe Clicked");
    }
  }

  render() {
    const { activeobservatory } = this.state;
    const { observatory } = this.props;
    const telescope = observatory[activeobservatory];
    return (
      <div>
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
        <iframe
          className="chart-div"
          src={telescope.chartURL}
          id="chart-24"
          onLoad={this.onIframeLoad}
        />        
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default VisibilityChart;
