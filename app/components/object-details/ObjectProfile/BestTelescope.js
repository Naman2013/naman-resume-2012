import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TELESCOPE_INDEX = 'data-telescope-index';

class BestTelescope extends Component {
  static propTypes = {
    telescopes: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = { telescopes: [] };

  state = {
    activeTelescope: 0,
  };

  updateActiveTelescope = (event) => {
    this.setState({
      activeTelescope: event.target.getAttribute(TELESCOPE_INDEX),
    });
  }

  render() {
    return (
      <div>
        <ul className="navigation">
          {this.props.telescopes
            .map((telescopeNav, index) => (
              <li>
                <button
                  onClick={this.updateActiveTelescope}
                  data-telescope-index={index}
                >
                  {telescopeNav.title}
                </button>
              </li>
            ))}
        </ul>
        <p>{this.props.telescopes[this.state.activeTelescope].description}</p>
      </div>
    );
  }
}

export default BestTelescope;
