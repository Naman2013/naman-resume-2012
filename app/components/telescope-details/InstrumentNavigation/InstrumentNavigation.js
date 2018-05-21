import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white, blueBlack, darkBlueGray } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

class InstrumentNavigation extends Component {
  static propTypes = {
    instruments: PropTypes.shape({
      instrTelescopeName: PropTypes.string.isRequired,
      instrUniqueId: PropTypes.string.isRequired,
    }).isRequired,
    handleInstrumentClick: PropTypes.func.isRequired,
    activeInstrumentID: PropTypes.string,
  };

  static defaultProps = {
    activeInstrumentID: null,
  };

  handleButtonClick = (event) => {
    const selectedInstrumentID = event.target.getAttribute('data-instrument-id');
    this.props.handleInstrumentClick(selectedInstrumentID);
  }

  render() {
    const { instruments, activeInstrumentID } = this.props;

    return (
      <ul>
        {instruments.map(instrument => (
          <li key={`instrument-tab-navigation-${instrument.instrUniqueId}`}>
            <button
              style={{
                backgroundColor:
                  (instrument.instrUniqueId === activeInstrumentID) ? blueBlack : darkBlueGray,
              }}
              data-instrument-id={instrument.instrUniqueId}
              onClick={this.handleButtonClick}
            >
              {instrument.instrTelescopeName}
            </button>
          </li>))}

        <style jsx>{`
        ul {
          display: flex;
          font-family: ${primaryFont};
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          width: 100%;
          height: 45px;
        }

        button {
          color: ${white};
          background: none;
          background-color: ${darkBlueGray};
          border: none;
          width: 100%;
          height: 100%;
        }

        button:focus, button:active {
          outline: none;
        }
      `}
        </style>
      </ul>
    );
  }
}

export default InstrumentNavigation;
