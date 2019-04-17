import React from 'react';
import { ModuleContainer } from './index';
import style from './observatory-information.style';

const ObservatoryInformation = props => {
  const { clockList, compactMode } = props;
  const { obsClosed, obsCurrentTime, obsOpen } = clockList;
  let cls = 'observatory-data-list';
  return (
    <ModuleContainer title="Observatory information">
      <ul className={compactMode ? `${cls} compact` : cls}>
        <li className="datum">
          <h4 className="title">{obsOpen.displayLabel}</h4>
          <div className="time-meta-container">
            <div className="time-information">
              <p className="time-field">{obsOpen.displayTime}</p>
              <p className="time-label">{obsOpen.displayTimeZone}</p>
            </div>
            {!compactMode && (
              <div className="local-time-information">
                <p className="local-time-line">
                  {obsOpen.displayOtherTimeZones} &nbsp;
                </p>
              </div>
            )}
          </div>
        </li>

        {!compactMode && (
          <li className="datum">
            <h4 className="title">{obsClosed.displayLabel}</h4>
            <div className="time-meta-container">
              <div className="time-information">
                <p className="time-field">{obsClosed.displayTime}</p>
                <p className="time-label">{obsClosed.displayTimeZone}</p>
              </div>
              <div className="local-time-information">
                <p className="local-time-line">
                  {obsClosed.displayOtherTimeZones} &nbsp;
                </p>
              </div>
            </div>
          </li>
        )}

        <li className="datum">
          <h4 className="title">{obsCurrentTime.displayLabel}</h4>
          <div className="time-meta-container">
            <div className="time-information">
              <p className="time-field">{obsCurrentTime.displayTime}</p>
              <p className="time-label">{obsCurrentTime.displayTimeZone}</p>
            </div>
            {!compactMode && (
              <div className="local-time-information">
                <p className="local-time-line">
                  {obsCurrentTime.displayOtherTimeZones} &nbsp;
                </p>
              </div>
            )}
          </div>
        </li>
      </ul>
      <style jsx>{style}</style>
    </ModuleContainer>
  );
};

export { ObservatoryInformation };
