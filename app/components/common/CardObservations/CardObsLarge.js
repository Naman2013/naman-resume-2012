import React, { Fragment } from 'react';
import style from './CardObservationsLarge.style';

const CardObsLarge = () => (
  <Fragment>
    <div className="card-obs">
      <div className="media-card-img-right"><img src="https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg" /></div>
      <div className="obs-left">
        <div className="card-obs-title">The Moon</div>
        <div className="card-obs-author">BY JESSICA ANDERSON</div>
        <div className="card-obs-desc">Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it  tristique de ullam ecorpere pretium…</div>
      </div>
      <div className="card-bottom">
        <ul>
          <li><img src="https://vega.slooh.com/assets/v4/common/heart.svg" /> 22</li>
          <li><img src="https://vega.slooh.com/assets/v4/common/comment.svg" /> 04</li>
          <li>DETAILS <img src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" /></li>
          <li>Captured: Jan 22, 2018</li>
        </ul>
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

export default CardObsLarge;
