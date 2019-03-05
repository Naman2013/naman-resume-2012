import React from 'react';
import { ModuleContainer } from './index';
import style from './observatory-information.style';

const ObservatoryInformation = () => (
  <ModuleContainer title="Observatory information">
    <ul className="observatory-data-list">
      <li className="datum">
        <h4 className="title">Observatory Closes</h4>
        <div className="time-meta-container">
          <div className="time-information">
            <p className="time-field">00:00:00</p>
            <p className="time-label">UTC</p>
          </div>
          <div className="local-time-information">
            <p className="local-time-line">00:00 EDT</p>
            <p className="local-time-line">00:00 PDT</p>
          </div>
        </div>
      </li>

      <li className="datum">
        <h4 className="title">Observatory Closes</h4>
        <div className="time-meta-container">
          <div className="time-information">
            <p className="time-field">00:00:00</p>
            <p className="time-label">UTC</p>
          </div>
          <div className="local-time-information">
            <p className="local-time-line">00:00 EDT</p>
            <p className="local-time-line">00:00 PDT</p>
          </div>
        </div>
      </li>
    </ul>
    <style jsx>{style}</style>
  </ModuleContainer>
);

export { ObservatoryInformation };
