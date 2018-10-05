import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isMatch from 'lodash/isMatch';
import axios from 'axios';
import ShowMore from 'components/common/ShowMore';

class ShowMoreWithNetwork extends Component {
  static propTypes = {
    onServiceResponse: PropTypes.func,
    activePageNumber: PropTypes.number,
    filterOptions: PropTypes.shape({}),
    apiURL: PropTypes.string.isRequired,
    onPaginationChange: PropTypes.func,
    count: PropTypes.number,
    responseFieldNames: PropTypes.shape({
      currentCount: PropTypes.string,
      totalCount: PropTypes.string,
    }),
    validateResponseAccess: PropTypes.func,
    user: PropTypes.shape({
    })
  }

  static defaultProps = {
    onServiceResponse: (resp) => { console.log(resp); },
    onPaginationChange: (q) => { console.log (q); },
    activePageNumber: 1,
    filterOptions: {},
    count: 10,
    responseFieldNames: {
      currentCount: 'count',
      totalCount: 'total',
    },
    user: {},
    validateResponseAccess: noop,
  }

  constructor(props) {
    super();
    this.state = {
      numberOfItems: 0,
      totalNumberOfItems: 0,
    };
    axios.post(props.apiURL, Object.assign({ page: props.activePageNumber }, props.filterOptions)).then(res => this.handleServiceResponse(res.data));
  }

  componentWillReceiveProps(nextProps) {
    if (!isMatch(this.props.filterOptions, nextProps.filterOptions)) {
      axios.post(nextProps.apiURL, Object.assign({ page: nextProps.activePageNumber }, nextProps.filterOptions)).then(res => this.handleServiceResponse(res.data));
    }
  }

  getPage = (page) => {
    const {
      apiURL,
      filterOptions,
      onPaginationChange,
      user,
      validateResponseAccess,
    } = this.props;
    onPaginationChange({ activePage: page });

    const params = Object.assign({ ...user, page }, filterOptions);
    axios.post(apiURL, params).then((res) => {
      validateResponseAccess(res);
      return this.handleServiceResponse(res.data);
    });
  }

  handleServiceResponse = (resp) => {
    const {
      responseFieldNames,
    } = this.props;
    this.props.onServiceResponse(resp);
    this.setState(state => ({
      numberOfItems: state.numberOfItems + resp[responseFieldNames.currentCount],
      totalNumberOfItems: resp[responseFieldNames.totalCount],
    }));
  }

  render() {
    const {
      apiURL,
      activePageNumber,
      filterOptions,
      responseFieldNames,
    } = this.props;

    const { numberOfItems, totalNumberOfItems } = this.state;

    return (
      <Fragment>
        <ShowMore
          currentCount={numberOfItems}
          totalCount={totalNumberOfItems}
          page={activePageNumber}
          handleShowMore={this.getPage}
        />
      </Fragment>
    );
  }
}

export default ShowMoreWithNetwork;
