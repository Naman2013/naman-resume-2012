import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import InstrumentNavigation from 'app/components/telescope-details/InstrumentNavigation';
import './large-screen-format.scss';

const LargeScreenFormat = props => {
  const {
    options,
    selectedIndex,
    activeInstrumentID,
    updateCurrentInstrument,
  } = props;

  const handleClick = (instrument: Object) => () => {
    if (instrument.instrUniqueId === activeInstrumentID) return;
    return updateCurrentInstrument(instrument);
  };

  return (
    <div className="large-format-nav-root">
      <ul className="option-list">
        {options.map((telescope, index) => (
          <li
            key={`dt-obs-nav-${telescope.thumbnailURL}`}
            className={classnames('option-container', {
              active: selectedIndex === index,
            })}
          >
            <Link
              className="option-telescope-name i-link"
              onClick={handleClick(telescope.instruments[0])}
              to={`/telescope-details/${telescope.observatoryUniqueID}/${telescope.telescopeUniqueID}/${telescope.instruments[0].instrUniqueId}`}
            >
              {telescope.name}
            </Link>

            <InstrumentNavigation
              telescope={telescope}
              activeInstrumentID={activeInstrumentID}
              updateCurrentInstrument={updateCurrentInstrument}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// LargeScreenFormat.propTypes = commonProps;

export { LargeScreenFormat };
