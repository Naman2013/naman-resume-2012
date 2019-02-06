import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import Button from '../../style/buttons/Button';
import styles from './slider-item.style';

const getIconStyle = iconURL => ({
  backgroundImage: `url(${iconURL})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const RecommendedObjectsItem = ({
  description,
  detailList,
  hasIcon,
  iconURL,
  subTitle,
  title,
}) => (
  <div key={uniqueId()} className="card-object">
    <div className="object-icon">{hasIcon ? <div style={getIconStyle(iconURL)} /> : null}</div>
    <div className="object-field title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="field-wrapper">
      <img src={detailList[0].iconUrl} alt="icon" />
      <div className="object-field details">{detailList[0].text}</div>
    </div>
    <div className="field-wrapper">
      <img src={detailList[1].iconUrl} alt="icon" />
      <div className="object-field details">{detailList[1].text}</div>
    </div>
    <div className="field-wrapper">
      <img src={detailList[2].iconUrl} alt="icon" />
      <div className="object-field details">{detailList[2].text}</div>
    </div>
    <Button text="options" theme={{ margin: '30px auto 0', width: '140px' }} />
    <style jsx>{styles}</style>
  </div>
);

export default RecommendedObjectsItem;
