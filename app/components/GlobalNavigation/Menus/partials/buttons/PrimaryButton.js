import React from 'react';
import { white } from '../../../../../styles/variables/colors';

const PrimaryButton = ({ labelText, anchor }) => (
  <div className="primary-button">
    <span className="fa fa-circle" />
    <a href={anchor}>{labelText}</a>
    <style jsx>{`
      color: ${white};
    `}</style>
  </div>
);

export default PrimaryButton;
