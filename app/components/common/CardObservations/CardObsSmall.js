import React, { Fragment } from 'react';
import style from './CardObservationsSmall.style';

const CardObsSmall = () => (
  <Fragment>
    <div className="card-obs">
      <div className="obs-left">
        <div className="card-obs-title">The Moon</div>
        <div className="card-obs-author">BY JESSICA ANDERSON</div>
        <div className="card-obs-desc">Nam dapibus nisl vitae elit fringilla rutrum…</div>
        <img src="https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg" />
      </div>
      <div className="card-bottom">
        <ul>
          <li><img src="https://vega.slooh.com/assets/v4/common/heart.svg" /> 22</li>
          <li><img src="https://vega.slooh.com/assets/v4/common/comment.svg" /> 04</li>
          <li>DETAILS <img src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" /></li>
        </ul>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

export default CardObsSmall;
