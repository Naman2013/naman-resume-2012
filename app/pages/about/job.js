import React, { Component } from 'react';
import CareerList from '../../components/about/career-list';
import careerListData from '../../example-api-data/careers-list';

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
