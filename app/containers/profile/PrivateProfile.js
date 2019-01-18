/** *********************************
 * V4 Private profile container
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

  render() {
    const { children, aboutData } = this.props;

    return (
      <div>
        {aboutData.aboutSloohSectionsList && (
          <Fragment>
            {/* <PageHeader
              icon={aboutData.aboutSloohIconUrl}
              title={aboutData.aboutSloohPageHeading1}
            />

            <Navigation aboutSloohSectionsList={aboutData.aboutSloohSectionsList} /> */}

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
  mapDispatchToProps,
)(About);
