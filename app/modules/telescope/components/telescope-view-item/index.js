import React from 'react';
import './styles.scss';
import img from './circle.png';

export const TelescopeView = props => {
  const { title } = props;
  return (
    <div className="telescope-view">
      <h4 className="h4-custom text-center">{title}</h4>
      <div className="view-line">
        <div />
        <div />
      </div>
      <img src={img} alt="" />
    </div>
  );
};
