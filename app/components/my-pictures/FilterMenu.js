import 'react-dates/lib/css/_datepicker.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import { DayPickerSingleDateController } from 'react-dates';
import { fetchObjectTypeList } from '../../modules/object-type-list/actions';
import { fetchFiltersLists, setFilters, setSelectedTagsTabIndex, setCurrentVisibleCalMonth } from '../../modules/my-pictures-filters/actions';
import SelectToggleList from '../common/forms/SelectToggleList';
import { white, darkBlueGray } from '../../styles/variables/colors';
import FilterMenuTags from './FilterMenuTags';

const mapStateToProps = ({ objectTypeList, myPicturesFilters }) => ({
  fetchingObjectTypeList: objectTypeList.fetching,
  objectFilterList: objectTypeList.objectListResponse.objectTypeList,
  objectListError: objectTypeList.error,
  ...myPicturesFilters,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchFiltersLists,
    fetchObjectTypeList,
    setFilters,
    setSelectedTagsTabIndex,
    setCurrentVisibleCalMonth
  }, dispatch),
});

export class FilterMenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.selectedFilters.dateFilter ? moment(props.selectedFilters.dateFilter).startOf('day') : null, // for datepicker
      focused: true,
      selectedTelescopeIndex: props.telescopes.telescopesList.findIndex(
        tele => tele.pierNumber === props.selectedFilters.pierNumber &&
          tele.observatoryId === props.selectedFilters.observatoryId
      ),
      selectedTimeIndex: props.times.timesList.findIndex(
        time => time.value === props.selectedFilters.timeFilter
      ),
      selectedObjectTypeIndex: props.objectFilterList.findIndex(
        obj => obj.objectTypeFilter === props.selectedFilters.filterType
      ),
    };

    this.calRef = null;
  }

  componentWillMount() {
    this.props.actions.fetchObjectTypeList();
    this.props.actions.fetchFiltersLists();
  }

  componentWillUpdate(nextProps) {
    if (this.props.page !== nextProps.page || !isEqual(this.props.selectedFilters, nextProps.selectedFilters)) {
      this.setState({
        date: nextProps.selectedFilters.dateFilter ? moment(nextProps.selectedFilters.dateFilter) : null, // for datepicker
        focused: true,
        selectedTelescopeIndex: nextProps.telescopes.telescopesList.findIndex(
          tele => tele.pierNumber === nextProps.selectedFilters.pierNumber &&
            tele.observatoryId === nextProps.selectedFilters.observatoryId
        ),
        selectedTimeIndex: nextProps.times.timesList.findIndex(
          time => time.value === nextProps.selectedFilters.timeFilter
        ),
        selectedObjectTypeIndex: nextProps.objectFilterList.findIndex(
          obj => obj.objectTypeFilter === nextProps.selectedFilters.filterType
        ),
      });
    }
  }

  handleTimeChange = (value) => {
    const { page, selectedFilters, galleryId, scheduledMissionId } = this.props;
    const nextTimeSelectedIndex = value;
    const nextTimeFilter = this.originalTimesFilter(nextTimeSelectedIndex);
    if (nextTimeSelectedIndex === this.state.selectedTimeIndex) {
      this.props.actions.setFilters({
        timeFilter: null,
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedTimeIndex: null
      });
    } else {
      this.props.actions.setFilters({
        timeFilter: nextTimeFilter.value
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedTimeIndex: nextTimeSelectedIndex
      });
    }
  }

  handleObjectFilterChange = (value) => {
    const { page, selectedFilters, galleryId, scheduledMissionId } = this.props;
    const nextObjectFilterIndex = value;
    const nextObjectFilter = this.originalObjectFilter(nextObjectFilterIndex);
    if (nextObjectFilterIndex === this.state.selectedObjectTypeIndex) {
      this.props.actions.setFilters({
        filterType: null
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedObjectTypeIndex: null
      });
    } else {
      this.props.actions.setFilters({
        filterType: nextObjectFilter.objectTypeFilter
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedObjectTypeIndex: nextObjectFilterIndex
      });
    }
  }

  handleTelescopeChange = (value) => {
    const { page, selectedFilters, galleryId, scheduledMissionId } = this.props;
    const nextTelescopeSelectedIndex = value;
    const nextTelescopeFilter = this.originalTelescopeFilter(nextTelescopeSelectedIndex);

    if (this.state.selectedTelescopeIndex === nextTelescopeSelectedIndex) {
      this.props.actions.setFilters({
        pierNumber: null,
        observatoryId: null,
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedTelescopeIndex: null
      });
    } else {
      this.props.actions.setFilters({
        pierNumber: nextTelescopeFilter.pierNumber,
        observatoryId: nextTelescopeFilter.observatoryId,
      }, { page, galleryId, scheduledMissionId });
      this.setState({
        selectedTelescopeIndex: nextTelescopeSelectedIndex
      });
    }

  }

  originalObjectFilter(index) {
    return this.props.objectFilterList[index];
  }

  originalTelescopeFilter(index) {
    return this.props.telescopes.telescopesList[index];
  }

  originalTimesFilter(index) {
    return this.props.times.timesList[index];
  }


  isDayHighlighted = (e) => {
    const availableDate = this.props.dates.datesList.filter(availableMoment => e.isSame(moment(availableMoment), 'day'));
    return availableDate.length > 0
  }

  setDateFilter = (date) => {
    const { actions, page, galleryId, scheduledMissionId } = this.props;
    if ((this.state.date && this.state.date.format('YYYY-MM-DD')) === (date && date.format('YYYY-MM-DD'))) {
      this.setState((() => ({
        date: null, // for the datepicker
      })));

      actions.setFilters({
        dateFilter: null,
      }, { page, galleryId, scheduledMissionId });
    } else {
      this.setState((() => ({
        date, // for the datepicker
      })));

      actions.setFilters({
        dateFilter: date.format('YYYY-MM-DD'),
      }, { page, galleryId, scheduledMissionId });
    }

  }

  handleTagClick = (param, value) => {
    const { actions, page, galleryId, scheduledMissionId } = this.props;
    actions.setFilters({
      [param]: value,
    }, { page, galleryId, scheduledMissionId });
  }

  onFocusChange = (input) => {
    this.setState({ focused: true });
  }

  setCalendarMonth = () => {
    const { actions, currentVisibleCalMonth } = this.props;
    const currMonth = this.calRef.state.currentMonth;
    if (!isEqual(currMonth, currentVisibleCalMonth)) {
      actions.setCurrentVisibleCalMonth({
        currentVisibleCalMonth: currMonth,
      });
    }
  }

  getIconStyle = (item, prop) => ({
    backgroundImage: `url(${item[prop]})`,
    height: '20px',
    width: '20px',
    display: 'inline-block',
    marginRight: '5px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px',
  })

  get timeFilterOptions() {
    const { times } = this.props;
    return times.timesList.map(time => time.name);
  }

  get objectFilterOptions() {
    const { objectFilterList } = this.props;
    return objectFilterList.map(objectFilter => (<span><div style={this.getIconStyle(objectFilter, 'objectTypeIconURL')} />{objectFilter.objectTypeDisplayName}</span>));
  }

  get telescopeFilterOptions() {
    const { telescopes } = this.props;
    return telescopes.telescopesList.map(tele => (<span><div style={this.getIconStyle(tele, 'iconUrl')} />{tele.name}</span>));
  }

  render() {
    const { selectedTelescopeIndex, selectedTimeIndex, selectedObjectTypeIndex } = this.state;
    const {
      currentVisibleCalMonth,
      pictureUserTags,
      missionSystemTags,
      missionUserTags,
      selectedFilters,
      actions,
      selectedTagsTabIndex
    } = this.props;

    const missionSystemTagsCount = selectedFilters.missionSystemTags.length;
    const missionUserTagsCount = selectedFilters.missionUserTags.length;
    const pictureUserTagsCount = selectedFilters.pictureUserTags.length;

    return (
      <div className="rootFilterMenu">
        <ul className="filterMenu">
          <li className="dateSection filterMenuSection">
            <h3 className="filterTitle">Date (UTC):</h3>
            <DayPickerSingleDateController
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={this.setDateFilter} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              hideKeyboardShortcutsPanel={true}
              keepOpenOnDateSelect={true}
              isDayHighlighted={this.isDayHighlighted}
              orientation="horizontal"
              ref={(_calRef) => { this.calRef = _calRef; }}
              onNextMonthClick={this.setCalendarMonth}
              onPrevMonthClick={this.setCalendarMonth}
              initialVisibleMonth={() => currentVisibleCalMonth}
            />
          </li>
          <li className="filterMenuSection tagSection">
            <h3 className="filterTitle">Tags:</h3>
            <FilterMenuTags
              setSelectedTagsTabIndex={actions.setSelectedTagsTabIndex}
              selectedTagsTabIndex={selectedTagsTabIndex}
              missionSystemTagsCount={missionSystemTagsCount}
              missionUserTagsCount={missionUserTagsCount}
              pictureUserTagsCount={pictureUserTagsCount}
              selectedFilters={selectedFilters}
              missionSystemTags={missionSystemTags}
              missionUserTags={missionUserTags}
              pictureUserTags={pictureUserTags}
              handleTagClick={this.handleTagClick}
            />
          </li>
          <li className="filterMenuSection">
            <h3 className="filterTitle">Time:</h3>
            <SelectToggleList
              theme="dark"
              selectedIndex={selectedTimeIndex}
              options={this.timeFilterOptions}
              listHeight="85%"
              name="times"
              handleSelectedChange={this.handleTimeChange}
            />
          </li>
          <li className="filterMenuSection">
            <h3 className="filterTitle">Object Types:</h3>
            <SelectToggleList
              theme="dark"
              selectedIndex={selectedObjectTypeIndex}
              options={this.objectFilterOptions}
              listHeight="85%"
              name="filter-by-object"
              handleSelectedChange={this.handleObjectFilterChange}
            />
          </li>
          <li className="filterMenuSection">
            <h3 className="filterTitle">Telescopes:</h3>
            <SelectToggleList
              theme="dark"
              selectedIndex={selectedTelescopeIndex}
              options={this.telescopeFilterOptions}
              listHeight="85%"
              name="telescope"
              handleSelectedChange={this.handleTelescopeChange}
            />
          </li>
        </ul>
        <style jsx>{`
          .rootFilterMenu {
            background: ${white};
            padding: 0 20px 25px 40px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            -webkit-box-shadow: 0px 0px 32px 0px rgba(117,117,117,1);
            -moz-box-shadow: 0px 0px 32px 0px rgba(117,117,117,1);
            box-shadow: 0px 0px 32px 0px rgba(117,117,117,1);
          }
          .filterMenu {
            padding: 0;
            margin: 0 auto;
            list-style: none;
            text-transform: capitalize;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .dateSection {
            min-width: 315px;
            max-width: 315px;
          }

          :global(.transition-container) {
            height: 336px !important;
          }

          :global(.DayPickerSingleDateController__picker) {
            position: inherit;
          }

          :global(.DateInput) {
            width: 100%;
          }

          .filterTitle {
            color: ${darkBlueGray};
            font-weight: 600;
            padding: 20px 10px 10px 5px;
            text-transform: none;
          }

          .filterMenuSection {
            flex: 1;
            margin-right: 15px;
          }

          .tagSection {
            flex: 2;
          }
        `}</style>
      </div>
    );
  }
}

FilterMenuComponent.defaultProps = {
  objectFilterList: [],
  dates: {
    datesList: []
  },
  telescopes: {
    telescopesList: []
  },
  galleryId: null,
  scheduledMissionId: null,
  selectedFilters: {
    dateFilter: '',
    pierNumber: null,
    observatoryId: null,
    filterType: '',
    timeFilter: null,
    pictureUserTags: [],
    missionUserTags: [],
    missionSystemTags: [],
    selectedTagsTabIndex: 0
  }
};

FilterMenuComponent.propTypes = {
  page: PropTypes.string.isRequired, // used to sort out some hard wiring of API calls
  scheduledMissionId: PropTypes.string,
  galleryId: PropTypes.string,
  objectFilterList: PropTypes.arrayOf(PropTypes.shape({
    objectTypeDisplayName: PropTypes.string.isRequired,
    objectTypeFilter: PropTypes.string.isRequired,
  })),
  dates: PropTypes.shape({
    datesList: PropTypes.arrayOf(PropTypes.string),
  }),
  times: PropTypes.shape({
    timesList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })),
  }),
  telescopes: PropTypes.shape({
    telescopesList: PropTypes.arrayOf(PropTypes.shape({
      pierNumber: PropTypes.string,
      observatoryId: PropTypes.string,
      name: PropTypes.string,
      iconUrl: PropTypes.string,
    }))
  }),
  missionSystemTags: PropTypes.shape({
    tagsList: PropTypes.arrayOf(PropTypes.string)
  }),
  missionUserTags: PropTypes.shape({
    tagsList: PropTypes.arrayOf(PropTypes.string)
  }),
  pictureUserTags: PropTypes.shape({
    tagsList: PropTypes.arrayOf(PropTypes.string)
  }),
  selectedFilters: PropTypes.shape({
    dateFilter: PropTypes.string,
    pierNumber: PropTypes.string,
    observatoryId: PropTypes.string,
    filterType: PropTypes.string,
    timeFilter: PropTypes.number,
  }),
  selectedTagsTabIndex: PropTypes.number,
  currentVisibleCalMonth: PropTypes.instanceOf(moment)
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenuComponent);
