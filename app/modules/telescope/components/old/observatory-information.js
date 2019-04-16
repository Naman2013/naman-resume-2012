import React from 'react';
import { ModuleContainer } from './index';
import style from './observatory-information.style';

const ObservatoryInformation = props => {
  const { clockList } = props;
  const {
    obsCloseDisplayOtherTimeZones,
    obsCloseDisplayTime,
    obsClosesLabel,
    obsCurrentDisplayOtherTimeZones,
    obsCurrentDisplayTime,
    obsOpenDisplayOtherTimeZones,
    obsOpenDisplayTime,
    obsOpenDisplayTimeZone,
    obsOpensLabel,
    obsTimeInLabel,
  } = clockList;
  return (
    <ModuleContainer title="Observatory information">
      <ul className="observatory-data-list">
        <li className="datum">
          <h4 className="title">{obsOpensLabel}</h4>
          <div className="time-meta-container">
            <div className="time-information">
              <p className="time-field">{obsOpenDisplayTime}</p>
              <p className="time-label">{obsOpenDisplayTimeZone}</p>
            </div>
            <div className="local-time-information">
              <p className="local-time-line">
                {obsOpenDisplayOtherTimeZones} &nbsp;
              </p>
            </div>
          </div>
        </li>

        <li className="datum">
          <h4 className="title">{obsClosesLabel}</h4>
          <div className="time-meta-container">
            <div className="time-information">
              <p className="time-field">{obsCloseDisplayTime}</p>
              <p className="time-label">{obsOpenDisplayTimeZone}</p>
            </div>
            <div className="local-time-information">
              <p className="local-time-line">
                {obsCloseDisplayOtherTimeZones} &nbsp;
              </p>
            </div>
          </div>
        </li>

        <li className="datum">
          <h4 className="title">{obsTimeInLabel}</h4>
          <div className="time-meta-container">
            <div className="time-information">
              <p className="time-field">{obsCurrentDisplayTime}</p>
              <p className="time-label">{obsOpenDisplayTimeZone}</p>
            </div>
            <div className="local-time-information">
              <p className="local-time-line">
                {obsCurrentDisplayOtherTimeZones} &nbsp;
              </p>
            </div>
          </div>
        </li>
      </ul>
      <style jsx>{style}</style>
    </ModuleContainer>
  );
};

export { ObservatoryInformation };
