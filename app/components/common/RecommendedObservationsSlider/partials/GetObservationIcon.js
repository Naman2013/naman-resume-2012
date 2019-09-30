import React from 'react';
import styles from './observation-icon.scss';

export const ReturnObservationIcon = ({ item }) => {
  return (
    <div className={item.text ? 'observation-icon' : null}>
      {item.text ? (
        <div className="link">
          <img
            className={`linkIcon${
              item.label === 'Member' ? ' memberIcon' : ''
            }`}
            src={item.iconUrl}
            alt={item.label}
          />
        </div>
      ) : null}
    </div>
  );
};
