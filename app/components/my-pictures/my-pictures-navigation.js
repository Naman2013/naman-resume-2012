import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import FilterMenu from './FilterMenu';
import { toggleFilterMenuDisplay, resetAllFilters } from '../../modules/my-pictures-filters/actions';
import s from './my-pictures-navigation.scss';

const mapStateToProps = ({ objectTypeList, myPictures, myPicturesFilters }) => ({
  photoRollCount: myPictures.photoRoll.imageCount,
  missionCount: myPictures.missions.imageCount,
  galleriesCount: myPictures.galleries.imageCount,
  objectFilterList: objectTypeList.objectListResponse.objectTypeList,
  objectTypeFilter: myPictures.objectTypeFilter,
  filterMenuIsOpen: myPicturesFilters.filterMenuIsOpen,
  selectedFilters: myPicturesFilters.selectedFilters,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleFilterMenuDisplay,
    resetAllFilters
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MyPicturesNavigation extends Component {
  handleFilterClick = (event) => {
    const { actions, filterMenuIsOpen } = this.props;
    event.preventDefault();
    actions.toggleFilterMenuDisplay({
      filterMenuIsOpen: !filterMenuIsOpen
    });
  }

  handleResetFilters = () => {
    const {
      actions,
      page,
      scheduledMissionId,
      galleryId,
    } = this.props;

    actions.resetAllFilters({
      dateFilter: '',
      pierNumber: null,
      observatoryId: null,
      filterType: '',
      timeFilter: null,
      pictureUserTags: [],
      missionUserTags: [],
      missionSystemTags: []
    }, {
      page,
      scheduledMissionId,
      galleryId
    });
  }

  hasFilters() {
    const { selectedFilters } = this.props;
    const filtersSelected = Object.values(selectedFilters).filter(filter => Array.isArray(filter) ? filter.length > 0 : !!filter);
    return filtersSelected && filtersSelected.length > 0;

  }

  render() {
    const {
      page,
      photoRollCount,
      missionCount,
      galleriesCount,
      galleryId,
      scheduledMissionId,
      filterMenuIsOpen,
      actions,
    } = this.props;
    const filterContainerClassnames = classnames(s.filterMenuWrapper, {
      hide: filterMenuIsOpen,
    });
    const filterButtonIconClassnames = classnames('fa', {
      'fa-angle-down': filterMenuIsOpen,
      'fa-angle-up': !filterMenuIsOpen,
    });

    const clearDisplayClassnames = classnames('fa fa-close filterDisplayIcon', {
      hide: !this.hasFilters(),
    });

    const rootNavigationFilterItemClassnames = classnames(`${s.rootNavigationItem} ${s.filters}`, {
      active: !filterMenuIsOpen,
    });

    return (
      <nav className={s.myPictureNavigationRoot}>
        <ul className={s.myPictureNavigationContainer}>
          <li className={s.rootNavigationItem}>
            <Link to="/my-pictures/photo-roll" className={s.button} activeClassName="active">
              Photo Roll <span>({photoRollCount})</span>
            </Link>
          </li>
          {/*<li className={s.rootNavigationItem}>
            <Link to="/my-pictures/galleries" className={s.button} activeClassName="active">
              Galleries <span>({galleriesCount || 0})</span>
            </Link>
          </li>*/}
          <li className={s.rootNavigationItem}>
            <Link to="/my-pictures/missions" className={s.button} activeClassName="active">
              Missions <span>({missionCount})</span>
            </Link>
          </li>

          <li className={rootNavigationFilterItemClassnames}>
            <div className={s.filterMenuContainer}>
              <button onClick={this.handleFilterClick} className={s.button}>
                Filter by
              </button>
              <button onClick={this.handleFilterClick} className={s.button}>
                <span className={filterButtonIconClassnames} />
              </button>
              <button className={s.button} onClick={this.handleResetFilters}>
                 <span className={clearDisplayClassnames} />
              </button>
            </div>
          </li>
        </ul>
        <div className={filterContainerClassnames}>
          <FilterMenu
            page={page}
            scheduledMissionId={scheduledMissionId}
            galleryId={galleryId}
          />
        </div>
      </nav>
    );
  }
}

MyPicturesNavigation.defaultProps = {
  page: 'photoRoll',
  objectFilterList: [],
  objectTypeFilter: '',
  galleryId: null,
  scheduledMissionId: null,
  filterMenuIsOpen: false,
};

MyPicturesNavigation.propTypes = {
  page: PropTypes.string,
  scheduledMissionId: PropTypes.string,
  galleryId: PropTypes.string,
  objectFilterList: PropTypes.arrayOf(PropTypes.shape({
    objectTypeDisplayName: PropTypes.string,
    objectTypeDisplayOrder: PropTypes.number,
    objectTypeFilter: PropTypes.string,
    objectTypeFilterLookupId: PropTypes.number,
    objectTypeIconURL: PropTypes.string,
    objectTypeIndex: PropTypes.number,
    objectTypeName: PropTypes.string,
  })),
  objectTypeFilter: PropTypes.string,
  filterMenuIsOpen: PropTypes.bool
};

export default MyPicturesNavigation;
