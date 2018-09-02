import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './BestTelescope.style';

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
      activeTelescope: parseInt(event.target.getAttribute(TELESCOPE_INDEX), 10),
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
                  className={classnames({ active: this.state.activeTelescope === index })}
                  onClick={this.updateActiveTelescope}
                  data-telescope-index={index}
                >
                  {telescopeNav.title}
                </button>
              </li>
            ))}
        </ul>
        <p>{this.props.telescopes[this.state.activeTelescope].description}</p>

        <style jsx>{style}</style>
      </div>
    );
  }
}

export default BestTelescope;
