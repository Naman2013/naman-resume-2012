import React, { cloneElement, useState } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';
import style from './PrivateProfilePhotos.style';

export default ({ children, location }) => {
  const currentTab = location.pathname.split('/').pop();

  const [isFilterOpen, setFilterOpen] = useState(true);

  return (
    <div style={{ background: '#f8f8f8' }}>
      <div className="root-wrapper">
        <div className="header-wrapper">
          <PhotoHubNavigation {...{ isFilterOpen, setFilterOpen }} />
        </div>
        <div className="body-wrapper">
          {isFilterOpen && (
            <div className="filter-shader animated fadeIn faster" />
          )}
          {cloneElement(children, {
            currentTab,
          })}
        </div>
        <style jsx>{style}</style>
      </div>
    </div>
  );
};
