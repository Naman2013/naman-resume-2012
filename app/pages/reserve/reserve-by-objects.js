import React, {Component} from 'react';
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
} from '../../modules/popular-objects-management/Popular-Objects';


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
    
    this.setCategory = this.setCategory.bind(this);
    this.setObject = this.setObject.bind(this);
    this.clearObject = this.clearObject.bind(this);
  }
  
  clearBrowse() {
    return () => {
      this.props.actions.clearBrowse();
    }
  }

  setCategory(item) {
    return () => {
      this.props.actions.setCategory(item);
    };
  }

  setObject(itemType, item, event) {    
    return () => {
      this.props.actions.setObject(item);
    };
  }

  scheduleMission() {
    // TODO: build this later
  }

  render() {
    const { category = {}, object } = this.state;    
    
    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">
          
          <div className="col-md-4">
            <h2><span>1</span> Select Category</h2>
            
            <ReserveObjectsCategory
              items={testData.categories}
              onClickHandler={this.setCategory}
              selectedItem={this.state.category} />
          </div>
          
          <div className="col-md-4">
            <h2><span>2</span> Choose Specific Object</h2>
            
            <ReserveObjectsList
              objects={category.objects}
              onClickHandler={this.setObject}
              selectedItem={this.state.object} />
          </div>
          
          <div className="col-md-4">
            <h2><span>3</span> Object Summary</h2>
            
            <ReserveObjectsSummary
              object={object}
              clearBrowse={this.clearBrowse}
              scheduleMission={this.scheduleMission.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReserveObjects;
