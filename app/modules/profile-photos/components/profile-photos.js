import React, { cloneElement, PureComponent } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';
import style from './PrivateProfilePhotos.style';

export class ProfilePhotos extends PureComponent {
  state = {
    isFilterOpen: true,
  };

  componentDidMount = () => {
    const { fetchFiltersLists } = this.props;
    fetchFiltersLists();
  };

  setFilterOpen = isFilterOpen => this.setState({ isFilterOpen });

  render() {
    const { children, location, allFilters } = this.props;
    // console.log(this.props);
    const currentTab = location.pathname.split('/').pop();

    const { isFilterOpen } = this.state;

    return (
      <div style={{ background: '#f8f8f8' }}>
        <div className="root-wrapper">
          <div className="header-wrapper">
            <PhotoHubNavigation
              isFilterOpen={isFilterOpen}
              setFilterOpen={this.setFilterOpen}
              filters={allFilters}
            />
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
  }
}
