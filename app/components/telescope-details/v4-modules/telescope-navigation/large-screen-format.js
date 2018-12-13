import React from 'react';
import classnames from 'classnames';
import { commonProps } from './common-prop-types';
import style from './large-screen-format.style';

const LargeScreenFormat = ({ onSelect, selectedIndex, options }) => (
  <div className="large-format-nav-root">
    <ul className="option-list">
      {
        options.map((telescope, index) => (
          <li
            key={`dt-obs-nav-${telescope.thumbnailURL}`}
            className={classnames('option-container', { active: (selectedIndex == index) })}
          >
            <button
              onClick={onSelect}
              data-index={index}
              className={classnames('option', { active: (selectedIndex == index) })}
              style={{marginLeft: '0px', marginRight: '0px'}}
            >
                <p>{telescope.name}</p>
                <div
                  className="coin"
                  style={{ backgroundImage: `url(${telescope.thumbnailURL})` }}
                />
            </button>
          </li>
        ))
      }
    </ul>
    <style jsx>{style}</style>
  </div>
);

LargeScreenFormat.propTypes = commonProps;

export { LargeScreenFormat };
