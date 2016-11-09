import React, { Component, PropTypes } from 'react';
import ReserveObjectsCategory from '../../components/reserve/reserve-by-object-category';
import styles from '../../components/reserve/reserve-by-object.scss';

class ReserveByCatalog extends Component {
  render() {
    return (
      <div className={styles.reserveObjectPage}>
        <div className="row">
          <div className="col-md-4">
            <h2><span>1</span> Select Category</h2>
            <ReserveObjectsCategory />
          </div>
          <div className="col-md-4">
            <h2><span>2</span> Choose Specific Object</h2>
            <ReserveObjectsCategory />
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

export default ReserveByCatalog;
