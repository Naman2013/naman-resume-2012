import React, { Component, PropTypes } from 'react';
import CareerList from '../../components/about/career-list';
import careerListData from '../../example-api-data/careers-list';

const { array } = PropTypes;

class Job extends Component {
  render() {
    return (
      <section className="job-posts">
        {careerListData.careerList.map((v, k) => <CareerList key={k} value={v} />)}
      </section>
    );
  }
}

export default Job;
