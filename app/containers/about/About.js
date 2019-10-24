/** *********************************
 * V4 About pages container
 ********************************** */

import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Navigation from '../../components/about/Navigation';
import { fetchAboutDataAction } from '../../modules/about/actions';

class About extends Component {
  static propTypes = {
    aboutData: PropTypes.shape({}).isRequired,
    fetchAboutDataAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchAboutDataAction();
  }

  loadJS9 = ind => {
    const urls = [
      'https://polaris.slooh.com/chile/1/highmag/2018/01/30/0435_m65/m65_20180130_043523_0_bhvtcx_l_cal.fit',
      'https://polaris.slooh.com/chile/1/highmag/2018/01/30/0415_ngc3372/ngc3372_20180130_041436_0_hhr1y4_l_cal.fit',
      'https://polaris.slooh.com/chile/1/highmag/2018/01/30/0355_ngc1365/ngc1365_20180130_035434_0_rsstlu_l_cal.fit',
    ];
    window.JS9.Load(urls[ind]);
  };

  render() {
    const { children, aboutData } = this.props;

    return (
      <div>
        <button onClick={() => this.loadJS9(0)}>Load FITS file 1</button>
        <button onClick={() => this.loadJS9(1)}>Load FITS file 2</button>
        <button onClick={() => this.loadJS9(2)}>Load FITS file 3</button>

        <hr />

        <div className="JS9Menubar"></div>
        <div className="JS9Toolbar"></div>
        <div className="JS9"></div>
        <div>
          <div className="JS9Colorbar"></div>
        </div>

        <hr />

        {aboutData.aboutSloohSectionsList && (
          <Fragment>
            <PageHeader
              icon={aboutData.aboutSloohIconUrl}
              title={aboutData.aboutSloohPageHeading1}
            />

            <Navigation
              aboutSloohSectionsList={aboutData.aboutSloohSectionsList}
            />

            {cloneElement(children)}
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ about, user }) => ({
  aboutData: about.aboutData,
  user,
});

const mapDispatchToProps = { fetchAboutDataAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
