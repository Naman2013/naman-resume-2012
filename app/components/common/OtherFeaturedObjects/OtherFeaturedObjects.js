import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import * as otherFeaturedObjectsActions from '../../../modules/other-featured-objects/actions';
import styles from './OtherFeaturedObjects.scss';

const { func, number, string, array } = PropTypes;

class OtherFeaturedObjects extends Component {
  componentWillMount() {
    const {
      params,
      fetchOtherFeaturedObjects,
      slugLookupId,
    } = this.props;

    fetchOtherFeaturedObjects({
      ...params,
      slugLookupId,
    });
  }
  render() {
    const {
      sectionObjectTitle,
      sectionTitle,
      sectionSubtitle,
      itemList,
      layoutDirection,
    } = this.props;
    const title = sectionTitle + sectionObjectTitle;
    const itemStyles = { flexDirection: layoutDirection, padding: layoutDirection === 'row' ? '25px' : 'auto' };
    return (
      <section className={styles.otherFeaturedObjects}>
        <header className={styles.otherFeaturedObjectsHeader}>
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
          <p dangerouslySetInnerHTML={{ __html: sectionSubtitle }} />
        </header>
        <div className="itemsContainer" style={itemStyles}>
          {
            itemList.map(v =>
              <div className={styles.otherFeaturedObjectsContainer} key={uniqueId()}>
                <article>
                  <h4 dangerouslySetInnerHTML={{ __html: v.itemTitle }} />
                  <img alt="" className={styles.otherFeaturedObjectsIcon} src={v.itemIconURL} />
                  <h2 dangerouslySetInnerHTML={{ __html: v.itemObjectTitle }} />
                  <p className={styles.otherFeaturedObjectsDescription} dangerouslySetInnerHTML={{ __html: v.itemDescription }} />
                  <Link
                    className={`btn btn-primary ${styles.otherFeaturedObjectsLink}`}
                    to={v.itemURL ? v.itemURL : `/objects/latest-entries/${v.slugLookupId}/all`}
                  >
                    Go to Object Page
                  </Link>
                  <hr className={styles.otherFeaturedObjectsHr} />
                </article>
              </div>
          )}
        </div>
        <style jsx>{`
          .itemsContainer {
            display: flex;
          }
        `}</style>
      </section>
    );
  }
}

OtherFeaturedObjects.defaultProps = {
  layoutDirection: 'column',
};

OtherFeaturedObjects.propTypes = {
  fetchOtherFeaturedObjects: func.isRequired,
  sectionObjectTitle: string,
  sectionTitle: string,
  sectionSubtitle: string,
  itemList: array,
  layoutDirection: string,
};

const mapStateToProps = ({ otherFeaturedObjects }) => ({
  ...otherFeaturedObjects
});
const mapDispatchToProps = dispatch => (bindActionCreators(otherFeaturedObjectsActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(OtherFeaturedObjects);
