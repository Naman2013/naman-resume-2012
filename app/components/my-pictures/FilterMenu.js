import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchObjectTypeList } from '../../modules/object-type-list/actions';
import { updateObjectFilterBy, resetObjectFilter } from '../../modules/my-pictures/actions';
import ReservationSelectList from '../common/forms/reservation-select-list';
import s from './FilterMenu.scss';

const mapStateToProps = ({ objectTypeList, myPictures }) => ({
  fetchingObjectTypeList: objectTypeList.fetching,
  objectFilterList: objectTypeList.objectListResponse.objectTypeList,
  objectListError: objectTypeList.error,
  objectTypeFilter: myPictures.objectTypeFilter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectTypeList,
    updateObjectFilterBy,
    resetObjectFilter,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.handleObjectFilterChange = this.handleObjectFilterChange.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchObjectTypeList();
  }

  handleObjectFilterChange(event) {
    const { page, objectTypeFilter } = this.props;
    const nextObjectFilterIndex = event.target.value;
    const nextObjectFilter = this.originalObjectFilter(nextObjectFilterIndex);

    if (objectTypeFilter.filterByIndex === nextObjectFilterIndex) {
      this.props.actions.resetObjectFilter(page);
    } else {
      this.props.actions.updateObjectFilterBy({
        filterByField: nextObjectFilter.objectTypeFilter,
        filterByIndex: event.target.value,
      }, page);
    }
  }

  originalObjectFilter(index) {
    return this.props.objectFilterList[index];
  }

  get objectFilterOptions() {
    const { objectFilterList } = this.props;
    return objectFilterList.map(objectFilter => objectFilter.objectTypeDisplayName);
  }

  render() {
    const objectFilteredByIndex = this.props.objectTypeFilter.filterByIndex;

    return (
      <div className={s.rootFilterMenu}>
        <ul className={s.filterMenu}>
          <li className={s.menu}>
            <h3 className={s.filterTitle}>Object Types:</h3>
            <ReservationSelectList
              theme="dark"
              selectedIndex={objectFilteredByIndex}
              options={this.objectFilterOptions}
              listHeight={200}
              name="filter-by-object"
              handleSelectChange={this.handleObjectFilterChange}
            />
          </li>
        </ul>
      </div>
    );
  }
}

FilterMenu.defaultProps = {
  objectFilterList: [],
};

FilterMenu.propTypes = {
  page: PropTypes.string.isRequired, // used to sort out some hard wiring of API calls
  objectFilterList: PropTypes.arrayOf(PropTypes.shape({
    objectTypeDisplayName: PropTypes.string.isRequired,
    objectTypeFilter: PropTypes.string.isRequired,
  })),
};

export default FilterMenu;
