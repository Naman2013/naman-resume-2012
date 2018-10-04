import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ShowMore from 'components/common/ShowMore';

class ShowMoreWithNetwork extends Component {
  static propTypes = {
    onServiceResponse: PropTypes.func,
    activePageNumber: PropTypes.number,
    filterOptions: PropTypes.shape({}),
    apiURL: PropTypes.string.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    count: PropTypes.number,
    responseFieldNames: PropTypes.shape({
      currentCount: PropTypes.string,
      totalCount: PropTypes.string,
    }),
  }

  static defaultProps = {
    onServiceResponse: (resp) => { console.log(resp); },
    activePageNumber: 1,
    filterOptions: {},
    count: 10,
    responseFieldNames: {
      currentCount: 'count',
      totalCount: 'total',
    },
  }

  state = {

  }

  componentDidMount() {
    const {
      apiURL,
      activePageNumber,
      filterOptions,
      responseFieldNames,
    } = this.props;
    axios.post(apiURL, Object.assign({ page: activePageNumber }, filterOptions)).then(this.handleServiceResponse(res.data));
  }

  handleServiceResponse = (resp) => {
    this.props.onServiceResponse(resp);
  }

  render() {
    const {
      apiURL,
      activePageNumber,
      filterOptions,
      responseFieldNames,
    } = this.props;

    return (
      <Fragment>
        <ShowMore
          currentCount={serviceResponse[responseFieldNames.currentCount]}
          totalCount={serviceResponse[responseFieldNames.totalCount]}
          defaultPage={activePageNumber}
          handleShowMore={this.props.onPaginationChange}
        />
      </Fragment>
    );
  }
}

export default ShowMoreWithNetwork;
