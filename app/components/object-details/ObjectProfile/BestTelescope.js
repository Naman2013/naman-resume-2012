import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import GenericButton from 'components/common/style/buttons/Button';
import { horizontalArrow } from 'styles/variables/iconURLs';
import style from './BestTelescope.style';

const TELESCOPE_INDEX = 'data-telescope-index';

class BestTelescope extends Component {
  static propTypes = {
    telescopes: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      linkUrl: PropTypes.string.isRequired,
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
              <li key={`best-telescopes-${telescopeNav.label}`}>
                <button
                  className={classnames('action-tab', { active: this.state.activeTelescope === index })}
                  onClick={this.updateActiveTelescope}
                  data-telescope-index={index}
                >
                  {telescopeNav.label}
                </button>
              </li>
            ))}
        </ul>
        <p className="description">{telescope.description}</p>
        <div className="action-link-container">
          <GenericButton
            onClickEvent={() => { browserHistory.push(telescope.linkUrl); }}
            text="Visit telescope"
            icon={horizontalArrow}
          />
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default BestTelescope;
