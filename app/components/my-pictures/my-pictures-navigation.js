import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import FilterMenu from './FilterMenu';
import { resetObjectFilter } from '../../modules/my-pictures/actions';
import s from './my-pictures-navigation.scss';

const mapStateToProps = ({ objectTypeList, myPictures }) => ({
  photoRollCount: myPictures.photoRoll.response.imageCount,
  missionCount: myPictures.missions.response.imageCount,
  objectFilterList: objectTypeList.objectListResponse.objectTypeList,
  objectTypeFilter: myPictures.objectTypeFilter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetObjectFilter,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MyPicturesNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideFilter: true,
    };

    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(event) {
    event.preventDefault();
    this.toggleFilterDisplay();
  }

  handleResetObjectFilter(event) {
    const { actions } = this.props;
    event.stopPropagation();
    actions.resetObjectFilter();
  }

  toggleFilterDisplay() {
    const { hideFilter } = this.state;
    this.setState({
      hideFilter: !hideFilter,
    });
  }

  get objectFilterDisplayName() {
    const { objectFilterList, objectTypeFilter } = this.props;
    return _(objectFilterList)
      .filter(objectFilter => objectFilter.objectTypeFilter === objectTypeFilter.filterByField)
      .map('objectTypeDisplayName')
      .value()[0];
  }

  render() {
    const { page, photoRollCount, missionCount, galleriesCount } = this.props;
    const { hideFilter } = this.state;
    const filterDisplayName = this.objectFilterDisplayName ? this.objectFilterDisplayName : 'None';
    const filterContainerClassnames = classnames(s.filterMenuWrapper, {
      hide: hideFilter,
    });
    const clearDisplayClassnames = classnames('fa fa-close filterDisplayIcon', {
      hide: !this.objectFilterDisplayName,
    });

    const filterButtonIconClassnames = classnames('fa', {
      'fa-angle-down': hideFilter,
      'fa-angle-up': !hideFilter,
    });

    const rootNavigationFilterItemClassnames = classnames(`${s.rootNavigationItem} ${s.filters}`, {
      active: !hideFilter,
    });
    return (
      <nav className={s.myPictureNavigationRoot}>
        <ul className={s.myPictureNavigationContainer}>
          <li className={s.rootNavigationItem}>
            <Link to="my-pictures/photo-roll" className={s.button} activeClassName="active">
              Photo Roll<span>({photoRollCount})</span>
            </Link>
          </li>
          <li className={s.rootNavigationItem}>
            <Link to="my-pictures/missions" className={s.button} activeClassName="active">
              Missions <span>({missionCount})</span>
            </Link>
          </li>

          <li className={rootNavigationFilterItemClassnames}>
            <div className={s.filterMenuContainer}>
              <button onClick={this.handleFilterClick} className={s.button}>
                Filter by:
                <span className={s.filterDisplayName} dangerouslySetInnerHTML={{ __html: filterDisplayName }} />
                <span className={clearDisplayClassnames} onClick={e => this.handleResetObjectFilter(e)} />
                <span className={filterButtonIconClassnames} />
              </button>
              <div className={filterContainerClassnames}>
                <FilterMenu
                  page={page}
                />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

MyPicturesNavigation.defaultProps = {
  page: 'photoRoll',
  objectFilterList: [],
  objectTypeFilter: '',
};

MyPicturesNavigation.propTypes = {
  page: PropTypes.string,
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
};

export default MyPicturesNavigation;
