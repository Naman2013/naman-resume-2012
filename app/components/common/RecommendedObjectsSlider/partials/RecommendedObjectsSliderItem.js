import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '../../style/buttons/Button';

import styles from './RecommendedObjectsSliderItem.style';
import messages from './RecommendedObjectsSliderItem.messages';

const getIconStyle = iconURL => ({
  backgroundImage: `url(${iconURL})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const {
  string,
  arrayOf,
  shape,
  bool,
} = PropTypes;

const RecommendedObjectsItem = ({
  detailList,
  hasIcon,
  iconURL,
  title,
}) => (
  <div className="card-object">
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
    <Button withIntl text={<FormattedMessage {...messages.Options} />} theme={{ margin: '30px auto 0', width: '140px' }} />
    <style jsx>{styles}</style>
  </div>
);

RecommendedObjectsItem.propTypes = {
  detailList: arrayOf(shape({ text: string.isRequired })).isRequired,
  hasIcon: bool.isRequired,
  iconURL: string.isRequired,
  title: string.isRequired,
};

export default RecommendedObjectsItem;
