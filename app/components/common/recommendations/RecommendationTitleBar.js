import React from 'react';
import s from './RecommendationTitleBar.scss';

const RecommendationTitleBar = ({ title, subTitle }) => {
  if (!title && !subTitle) {
    return null;
  }

  return (
    <div className={s.recommendationTitleBarRoot}>
      {
        title ? <h3 className={s.title}>{title}</h3> : null
      }
      {
        subTitle ?
          <h5 dangerouslySetInnerHTML={{ __html: subTitle }} className={s.subTitle} /> : null
      }
    </div>
  );
};

export default RecommendationTitleBar;
