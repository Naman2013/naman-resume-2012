import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ReservationSelectList from '../../components/common/forms/reservation-select-list';
import EnterDesignationForm from '../../components/reserve/enter-designation-form';
import { fetchCatalog } from '../../modules/catalog/get-catalog-actions';
import { fetchPresetOptions } from '../../modules/get-preset-options/get-preset-options-actions';
import styles from '../../components/reserve/reserve-by-object.scss';



const mapStateToProps = ({ catalog }) => ({
  ...catalog
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchCatalog,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveByCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityValid: false,
      presetOptions: null,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchCatalog();
    this.fetchImageProcessing();
  }

  fetchImageProcessing(telescopeId) {
    const normalizedTelescopeIdSource = this.props.telescopeId || telescopeId;
    if(normalizedTelescopeIdSource) {
      fetchPresetOptions({
        telescopeId: normalizedTelescopeIdSource,
      })
      .then(result => {
        this.setState({
          presetOptions: result.data,
        });
      });
    }
  }

  handleFormChange(event) {
    console.log(this);

    // if the designation is valid, then fetchImageProcessing
  }

  render() {
    const { showPlaceOnHold, showCancelHold, catalog } = this.props;
    const { presetOptions } = this.state;

    let catalogList = [];
    if(_.has(catalog, 'catalogList')) {
      catalogList = catalog.catalogList.map(catalogItem => (
        <span><img src={catalogItem.catIconURL} height="15" /> {catalogItem.catFullName}</span>
      ));
    }

    let imageOptions = [];
    if(_.has(presetOptions, 'telescopeList')) {
      imageOptions = presetOptions.telescopeList[0].telePresetList.map(presetOption => presetOption.presetDisplayName);
    }

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
              <EnterDesignationForm
                ref="designation"
              />
            </div>

            <div className="col-md-4">
              <h2><span className="number">3</span> Select Image Processing</h2>
              <ReservationSelectList
                ref="imageProcessing"
                options={imageOptions}
                name="imageProcessing"
                listHeight={170}
              />
              <p className="sub-text">Your captures will be saved to the <br /> My Pictures area of the Telescopes menu.</p>

              <section className="actions-container">
                {
                  showPlaceOnHold ?
                  <button className="btn-primary">Hold One Hour</button> : null
                }
                {
                  showCancelHold ?
                  <button className="btn-primary">Cancel Hold</button> : null
                }
                <button className="btn-primary">Schedule Mission</button>
              </section>
            </div>

          </div>

        </form>

      </div>
    )
  }
}

ReserveByCatalog.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
};

const { string, number, bool } = PropTypes;
ReserveByCatalog.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
  telescopeId: string,
};

export default ReserveByCatalog;
