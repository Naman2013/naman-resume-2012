import React from 'react';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import StaticCell from 'app/components/common/grid/StaticCell';
import style from './telescope-detail.style';

const tileStyle = { minHeight: 'auto' };

const TelescopeDetail = props => {
  const {
    teleName,
    instrAbout,
    obsShortName,
    instrRelatedGuideUrl,
    obsHeroURL,
    instrTelescopeType,
    instrTelescopeShortName,
  } = props;
  const onViewGuideClick = () => browserHistory.push(instrRelatedGuideUrl);
  return (
    <div>
      <div className="module-set">
        <div className="image-wrap">
          <img alt={teleName} src={obsHeroURL} className="telescope-image" />
        </div>
        <h3 className="title">
          {teleName}
          <br />
          {instrTelescopeShortName}
        </h3>
        <ul className="detail-actions">
          <li>
            <Btn onClick={onViewGuideClick}>View guide</Btn>
          </li>
        </ul>
      </div>

      <div className="module-set">
        <h4 className="about-title">About this scope</h4>
        <p className="about-content">{instrAbout}</p>
      </div>

      <div className="module-set">
        {instrTelescopeType && (
          <StaticCell theme={tileStyle} title="Telescope type">
            <p className="telescope-meta">{instrTelescopeType}</p>
          </StaticCell>
        )}

        {obsShortName && (
          <StaticCell theme={tileStyle} title="Observatory">
            <p className="telescope-meta">{obsShortName}</p>
          </StaticCell>
        )}

        {teleName && (
          <StaticCell theme={tileStyle} title="Pier">
            <p className="telescope-meta">{teleName}</p>
          </StaticCell>
        )}
      </div>
      <style jsx>{style}</style>
    </div>
  );
};

export { TelescopeDetail };
