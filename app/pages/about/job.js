import React, { Component, PropTypes } from 'react';
import { CareerList } from '../../components/about/careerList';
import careerList from '../../example-api-data/careers-list';
// import style from './about.scss';

const { array } = PropTypes;

class Job extends Component {
    render() {
        return(
            <section className="job-posts">
                
                {this.props.careerList.map((v, k) => <CareerList key={k} value={v} /> )}
            
            </section>
        );
    }
}

Job.defaultProps = {
    careerList: careerList.careerList,
};

Job.propTypes = {
    careerList: array,
};

export default Job;
