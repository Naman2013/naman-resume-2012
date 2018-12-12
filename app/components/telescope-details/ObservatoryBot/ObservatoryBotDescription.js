import React from 'react';
import s from './ObservatoryBot.scss';

export default function ObservatoryBotDescription(props) {
  let displayFlag = 'inline-block';
  if (props.displayFlag === false) {
    displayFlag = 'none';
  }

  return (
    <div style={{display: displayFlag}}>
      <p>
        The Obs Bot displays live observatory and conditions alerts, upcoming mission info, and a peek behind the curtain as the observatory equipment and patented processes spring into action to deliver the real-time imagery.
      </p>
    </div>
  );
}
