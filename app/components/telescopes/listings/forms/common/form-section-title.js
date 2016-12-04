import React from 'react';
import style from './form-section-title.scss';

const FormSectionTitle = ({ text, number }) => (
  <div className="form-section-title">
    <div className="number-field">
      {number}
    </div>
    <h3 className="title">{text}</h3>
  </div>
);

export default FormSectionTitle;
