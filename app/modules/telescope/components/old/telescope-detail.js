import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from 'components/common/style/buttons/Button';
import StaticCell from 'components/common/grid/StaticCell';
import style from './telescope-detail.style';

const tileStyle = { minHeight: 'auto' };

const TelescopeDetail = () => (
  <div>
    <div className="module-set">
      <img className="telescope-image" src="" width="100%" alt="telescope" />
      <h3 className="title">Canary three</h3>
      <ul className="detail-actions">
        <li><DefaultButton style={{ width: '100%' }} text="View guide" /></li>
      </ul>
    </div>

    <div className="module-set">
      <h4 className="about-title">About this scope</h4>
      <p className="about-content">Name dapibus nisl vitae</p>
    </div>

    <div className="module-set">
      <StaticCell
        theme={tileStyle}
        title="Telescope type"
      >
        <p className="telescope-meta">High-Magnification</p>
      </StaticCell>

      <StaticCell
        theme={tileStyle}
        title="Observatory"
      >
        <p className="telescope-meta">Canary Islands</p>
      </StaticCell>

      <StaticCell
        theme={tileStyle}
        title="Pier"
      >
        <p className="telescope-meta">Canary Three</p>
      </StaticCell>
    </div>
    <style jsx>{style}</style>
  </div>
);

export { TelescopeDetail };
