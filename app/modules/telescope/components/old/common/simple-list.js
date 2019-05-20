import React from 'react';
import style from './simple-list.style';

const SimpleList = ({ data }) => (
  <ul className="data-set">
    {data.map(measurement => (
      <li key={`${measurement.title}-${measurement.field}`} className="node">
        <ul className="datum">
          <li className="title">{measurement.title}</li>
          <li
            className="field text-right"
            dangerouslySetInnerHTML={{ __html: measurement.field }}
          />
        </ul>
      </li>
    ))}
    <style jsx>{style}</style>
  </ul>
);

export { SimpleList };
