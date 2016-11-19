import React, {Component} from 'react';
import ReserveObjectsCategory from '../../components/reserve/reserve-by-object-category';
import ReserveObjectsList from '../../components/reserve/reserve-by-object-list';
import ReserveObjectsSummary from '../../components/reserve/reserve-by-object-summary';
import styles from '../../components/reserve/reserve-by-object.scss';
import testData from './reserve-by-objects-data.js';
import _ from 'lodash';

class ReserveObjects extends Component {
  constructor(props) {
    super(props);
    
    this.state = {    
      category: null,
      object: null
    };
  }

  onItemClick(itemType, item, event) {
    let update = {};
    update[itemType] = item;
    this.setState(update);

    // TODO: do this with redux
  }

  render() {
    const selectedCategory = this.state.category || {};

    const selectedObject = this.state.object || null;

    const clickHandler = _.curry(this.onItemClick.bind(this));

    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">
          <div className="col-md-4">
            <h2><span>1</span> Select Category</h2>
            <ReserveObjectsCategory items={testData.categories} onClickHandler={clickHandler('category')}/>
          </div>
          <div className="col-md-4">
            <h2><span>2</span> Choose Specific Object</h2>
            <ReserveObjectsList objects={selectedCategory.objects} onClickHandler={clickHandler('object')} />
          </div>
          <div className="col-md-4">
            <h2><span>3</span> Object Summary</h2>
            <ReserveObjectsSummary object={selectedObject}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ReserveObjects;
