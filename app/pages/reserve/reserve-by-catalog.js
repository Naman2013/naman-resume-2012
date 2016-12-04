import React, { Component, PropTypes } from 'react';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import EnterDesignationForm from '../../components/reserve/enter-designation-form';
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
  'Morphological Catalog of Galaxies',
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

const imageProcessingOptions = [
  'Generic',
  'Bright Star',
  'Open Cluster',
  'Globular Cluster',
  'Bright Galaxy or Comet',
  'Generic',
  'Bright Star',
  'Open Cluster',
  'Globular Cluster',
  'Bright Galaxy or Comet'
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
              <h2><span className="number">1</span> Select Catalog</h2>
              <ReservationSelectList
                ref="catalog"
                options={catalogList}
                name="catalog"
              />
            </div>

            <div className="col-md-4">
              <h2><span className="number">2</span> Enter Designation</h2>
              <EnterDesignationForm />
            </div>

            <div className="col-md-4">
              <h2><span className="number">3</span> Select Image Processing</h2>
              <ReservationSelectList
                ref="imageProcessing"
                options={imageProcessingOptions}
                name="imageProcessing"
                listHeight={170}
              />
              <p className="sub-text">Your captures will be saved to the <br /> My Pictures area of the Telescopes menu.</p>

              <section className="actions-container">
                <button className="btn-primary">Hold One Hour</button>
                <button className="btn-primary">Schedule Mission</button>
              </section>
            </div>

          </div>

        </form>

      </div>
    )
  }
}

export default ReserveByCatalog;
