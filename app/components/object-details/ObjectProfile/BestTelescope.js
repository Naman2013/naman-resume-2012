import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import style from './BestTelescope.style';

const TELESCOPE_INDEX = 'data-telescope-index';

class BestTelescope extends Component {
  static propTypes = {
    telescopes: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      linkURL: PropTypes.string.isRequired,
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
    const { activeTelescope } = this.state;
    const telescope = this.props.telescopes[activeTelescope];
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
        <p>{telescope.description}</p>
        <GenericButton
          onClickEvent={() => { window.location = telescope.linkURL; }}
          text="Visit telescope"
          icon={horizontalArrow}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default BestTelescope;
