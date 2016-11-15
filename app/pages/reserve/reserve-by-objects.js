import React, {Component} from 'react';
import ReserveObjectsCategory from '../../components/reserve/reserve-by-object-category';
import styles from '../../components/reserve/reserve-by-object.scss';
import testData from './reserve-by-objects-data.js'

class ReserveObjects extends Component {

  onItemClick(itemType) {
    return (item) => {
      console.log('clicked: ', item);
      // TODO: find out how to update the state. redux?
    }
  }

  render() {
    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">
          <div className="col-md-4">
            <h2><span>1</span> Select Category</h2>
            <ReserveObjectsCategory items={testData.categories} onClickHandler={this.onItemClick('category')}/>
          </div>
          <div className="col-md-4">
            <h2><span>2</span> Choose Specific Object</h2>
            <ReserveObjectsCategory onClickHandler={this.onItemClick('object')} />
          </div>
          <div className="col-md-4">
            <h2><span>3</span> Object Summary</h2>
            <ReserveObjectsCategory />
          </div>
        </div>

      </div>
    )
  }
}

export default ReserveObjects;
