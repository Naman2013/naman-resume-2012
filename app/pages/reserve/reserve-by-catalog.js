import React, { Component, PropTypes } from 'react';
import ReserveObjectsCategory from '../../components/reserve/reserve-by-object-category';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import styles from '../../components/reserve/reserve-by-object.scss';

const catalogList = [
  'Abell Catalog of Galaxy Clusters',
  'Aitken Double Star Catalog',
  'Arp Catalog of Peculiar Galaxies',
  'Jack Bennett Catalogue of Southern Hemisphere Objects',
  'Caldwell Catalog of 109 Deep Sky Objects',
  'Collinder Catalog of Open Star Clusters',
  '1st & 2nd Index Catalog of Nebulae and Clusters of Stars',
  'Lynds Catalog of Bright Nebulae',
  'Morphological Catalog of Galaxies'
];

class ReserveByCatalog extends Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    console.log(this);
  }

  render() {
    return (
      <div className={styles.reserveObjectPage}>

        <form onChange={this.handleFormChange}>

          <div className="row">
            
            <div className="col-md-4">
              <h2><span>1</span> Select Catalog</h2>
              <ReservationSelectList
                ref="catalog"
                options={catalogList}
                name="catalog"
              />
            </div>

            <div className="col-md-4">
              <h2><span>2</span> Enter Designation</h2>
              <ReserveObjectsCategory />
            </div>

            <div className="col-md-4">
              <h2><span>3</span> Select Image Processing</h2>
              <ReserveObjectsCategory />
            </div>
          </div>

        </form>

      </div>
    )
  }
}

export default ReserveByCatalog;
