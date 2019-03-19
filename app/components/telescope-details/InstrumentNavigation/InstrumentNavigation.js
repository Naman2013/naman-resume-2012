// @flow
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './index.scss';

type TInstrumentNavigation = {
  telescope: Object,
  activeInstrumentID: string | void,
  updateCurrentInstrument: Function,
};

const InstrumentNavigation = (props: TInstrumentNavigation) => {
  const { telescope, activeInstrumentID, updateCurrentInstrument } = props;
  if (!telescope) return null;

  const {
    thumbnailURL,
    instruments,
    observatoryUniqueID,
    telescopeUniqueID,
  } = telescope;
  if (!instruments && !instruments.length) return null;

  const handleClick = (instrument: Object) => () => {
    if (instrument.instrUniqueId === activeInstrumentID) return;
    return updateCurrentInstrument(instrument);
  };

  const path = `/telescope-details/${observatoryUniqueID}/${telescopeUniqueID}`;

  return (
    <ul className={classnames('instrument-navigation', {
      'no-border': instruments.length === 1
    })}>
      {instruments.map((instrument, index) => {
        return (
          <li
            key={`instrument-tab-navigation-${instrument.instrUniqueId}`}
            className={classnames('instrument-navigation-el', {
              'order-1': index === 0,
              'order-3': instruments.length !== 1 && index === instruments.length - 1
            })}
          >
            <Link
              to={`${path}/${instrument.instrUniqueId}`}
              onClick={handleClick(instrument)}
              className={classnames('instrument-navigation-btn i-link', {
                'active': instrument.instrUniqueId === activeInstrumentID
              })}
            >
              {instrument.instrTelescopeShortName}
            </Link>
          </li>
        )
      })}
      <li className="instrument-navigation-el order-2">
        <Link
          className="instrument-navigation-btn"
          to={`${path}/${telescope.instruments[0].instrUniqueId}`}
          onClick={handleClick(telescope.instruments[0])}
        >
          <img src={thumbnailURL} alt="" />
        </Link>
      </li>
    </ul>
  );
};

export default InstrumentNavigation;
