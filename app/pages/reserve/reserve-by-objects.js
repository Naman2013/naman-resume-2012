import React, { Component, PropTypes } from 'react';
import ReserveObjectsCategory from '../../components/reserve/reserve-by-object-category';
import ReserveObjectsList from '../../components/reserve/reserve-by-object-list';
import ReserveObjectsSummary from '../../components/reserve/reserve-by-object-summary';
import styles from '../../components/reserve/reserve-by-object.scss';
import testData from './reserve-by-objects-data.js';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setCategory,
  setObject,
  clearBrowse
} from '../../modules/browse-by-popular-objects/Popular-Objects';


const mapStateToProps = ({ popularObjects }) => ({
  ...popularObjects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setCategory,
    setObject,
    clearBrowse,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveObjects extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.setCategory = this.setCategory.bind(this);
    this.setObject = this.setObject.bind(this);
    this.clearBrowse = this.clearBrowse.bind(this);
    this.scheduleMission = this.scheduleMission.bind(this);
  }

  clearBrowse() {
    this.props.actions.clearBrowse();
  }

  setCategory(item) {
    this.props.actions.setCategory(item);
  }

  setObject(item) {
    this.props.actions.setObject(item);
  }

  scheduleMission() {
    // TODO: build this later
  }

  render() {
    const { category, object, sectionHeight } = this.props;

    const selectedCategory = category || {};
    const selectedObject = object || {};

    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">

          <div className="col-md-4">
            <h2><span>1</span> Select Category</h2>

            <ReserveObjectsCategory
              items={testData.categories}
              selectedCategory={selectedCategory}
              onClickHandler={this.setCategory} />
          </div>

          <div className="col-md-4">
            <h2><span>2</span> Choose Specific Object</h2>

            <ReserveObjectsList
              selectedCategory={selectedCategory}
              selectedObject={selectedObject}
              onClickHandler={this.setObject}
            />
          </div>

          <div className="col-md-4">
            <h2><span>3</span> Object Summary</h2>

            <ReserveObjectsSummary
              object={object}
              clearBrowse={this.clearBrowse}
              scheduleMission={this.scheduleMission}
              summaryActions={this.props.summaryActions}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReserveObjects.defaultProps = {
  summaryActions: {
    resetForm: true,
    makeReservation: true,
    placeOnHold: false,
  }
};

ReserveObjects.propTypes = {
  summaryActions: PropTypes.shape({
    resetForm: PropTypes.bool,
    makeReservation: PropTypes.bool,
    placeOnHold: PropTypes.bool,
  }),
};

export default ReserveObjects;
