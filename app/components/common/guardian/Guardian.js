import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import ByUserTag from '../by-user-tag/by-user-tag';
import * as guardianActions from '../../../modules/guardian/actions';
import styles from '../OtherFeaturedObjects/OtherFeaturedObjects.scss';

const { bool, func, number, string, array, shape } = PropTypes;

class GuardianWidget extends Component {
  componentWillMount() {
    const {
      fetchGuardianInfo,
      slugLookupId,
    } = this.props;

    fetchGuardianInfo({
      slugLookupId,
    });
  }
  render() {
    const {
      guardianInfo,
    } = this.props;
    return (
      <section className={styles.otherFeaturedObjects}>
        <header className={styles.otherFeaturedObjectsHeader}>
          <h2 dangerouslySetInnerHTML={{ __html: guardianInfo.guardianTitle }} />
          <p dangerouslySetInnerHTML={{ __html: guardianInfo.guardianText }} />
        </header>

        <div className={styles.otherFeaturedObjectsContainer} key={uniqueId()}>
          <article className={styles.guardianContainer}>
            <ByUserTag
              accountType={guardianInfo.membershipType}
              memberSince={guardianInfo.memberSince}
              name={guardianInfo.displayName}
              location={guardianInfo.location}
              photo={guardianInfo.avatarURL}
            />
            <p dangerouslySetInnerHTML={{ __html: guardianInfo.bioBlurb }} />
          </article>
        </div>

      </section>
    );
  }
}

GuardianWidget.defaultProps = {
};

GuardianWidget.propTypes = {
  fetchGuardianInfo: func.isRequired,
  guardianInfo: shape({
    guardianFlag: bool,
    guardianTitle: string,
    guardianText: string,
    customerId: number,
    firstName: string,
    location: string,
    membershipType: string,
    displayName: string,
    userId: string,
    memberSince: string,
    avatarType: string,
    avatarURL: string,
    bioBlurb: string,
  }).isRequired
};

const mapStateToProps = ({ guardian }) => ({
  ...guardian
});
const mapDispatchToProps = dispatch => (bindActionCreators(guardianActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(GuardianWidget);
