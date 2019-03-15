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

  const handleButtonClick = (instrument: Object) => () => {
    if (instrument.instrUniqueId === activeInstrumentID) return;
    return updateCurrentInstrument(instrument);
  };

  const path = `/telescope-details/${observatoryUniqueID}/${telescopeUniqueID}`;

  return (
    <ul
      className="instrument-navigation"
      style={{ backgroundImage: `url(${thumbnailURL})` }}
    >
      {instruments.map(instrument => (
        <li
          className="instrument-navigation-el"
          onClick={handleButtonClick(instrument)}
          key={`instrument-tab-navigation-${instrument.instrUniqueId}`}
        >
          <Link
            to={`${path}/${instrument.instrUniqueId}`}
            className={classnames('instrument-navigation-btn', {
              active: instrument.instrUniqueId === activeInstrumentID,
            })}
          >
            {instrument.instrTelescopeName}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default InstrumentNavigation;
