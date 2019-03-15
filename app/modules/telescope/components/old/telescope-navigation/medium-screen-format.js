import React from 'react';
import { SmallScreenFormat } from './index';
import { enhancedProps } from './common-prop-types';
import style from './medium-screen-format.style';

const MediumScreenFormat = ({
  title,
  selectedIndex,
  options,
  activeInstrumentID,
  updateCurrentInstrument,
}) => {
  return (
    <div>
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
            updateCurrentInstrument={updateCurrentInstrument}
          />
        </li>
      </ul>
      <style jsx>{style}</style>
    </div>
  );
};

MediumScreenFormat.propTypes = enhancedProps;

export { MediumScreenFormat };
