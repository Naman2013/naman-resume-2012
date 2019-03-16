import React from 'react';
import classnames from 'classnames';
import InstrumentNavigation from 'app/components/telescope-details/InstrumentNavigation';
import { commonProps } from './common-prop-types';
import './large-screen-format.scss';

const LargeScreenFormat = props => {
  const {
    options,
    selectedIndex,
    activeInstrumentID,
    updateCurrentInstrument,
  } = props;
  const cls = 'option-telescope-name';
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
            <p
              className={
                telescope.instruments.length === 1 ? `${cls} no-border` : cls
              }
            >
              {telescope.name}
            </p>
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

LargeScreenFormat.propTypes = commonProps;

export { LargeScreenFormat };
