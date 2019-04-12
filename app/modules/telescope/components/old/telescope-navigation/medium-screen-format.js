import React, { Fragment } from 'react';
import { SmallScreenFormat } from './index';
import { enhancedProps } from './common-prop-types';
import style from './medium-screen-format.style';

const MediumScreenFormat = props => {
  const {
    title,
    selectedIndex,
    options,
    activeInstrumentID,
    currentInstrumentName,
    updateCurrentInstrument
  } = props;
  return (
    <Fragment>
      <ul className="list-navigation">
        {title && (
          <li className="item">
            <h2 className="page-title">{title}</h2>
          </li>
        )}
        <li className="item">
          <SmallScreenFormat
            options={options}
            selectedIndex={selectedIndex}
            activeInstrumentID={activeInstrumentID}
            currentInstrumentName={currentInstrumentName}
            updateCurrentInstrument={updateCurrentInstrument}
          />
        </li>
      </ul>
      <style jsx>{style}</style>
    </Fragment>
  );
};

MediumScreenFormat.propTypes = enhancedProps;

export { MediumScreenFormat };
