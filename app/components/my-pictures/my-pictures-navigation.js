import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import FilterMenu from './FilterMenu';
import s from './my-pictures-navigation.scss';

const mapStateToProps = ({ myPictures }) => ({
  photoRollCount: myPictures.photoRoll.response.imageCount,
  missionCount: myPictures.missions.response.imageCount,
});

@connect(mapStateToProps)
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

  toggleFilterDisplay() {
    const { hideFilter } = this.state;
    this.setState({
      hideFilter: !hideFilter,
    });
  }

  render() {
    const { page, photoRollCount, missionCount, galleriesCount } = this.props;
    const { hideFilter } = this.state;
    const filterContainerClassnames = classnames(s.filterMenuWrapper, {
      hide: hideFilter,
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
                Filter by <span className={filterButtonIconClassnames} />
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
};

MyPicturesNavigation.propTypes = {
  page: PropTypes.string,
};

export default MyPicturesNavigation;
