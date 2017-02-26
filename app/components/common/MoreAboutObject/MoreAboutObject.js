import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import * as featuredContentActions from '../../../modules/featured-content/actions';
import styles from './MoreAboutObject.scss';

const { func, number, string, array } = PropTypes;

class MoreAboutObject extends Component {
  componentWillMount() {
    const {
      fetchFeatured,
      slugLookupId,
    } = this.props;

    fetchFeatured({
      slugLookupId,
    });
  }
  render() {
    const {
      sectionObjectTitle,
      sectionTitle,
      sectionSubtitle,
      itemList,
    } = this.props;
    const title = sectionTitle + sectionObjectTitle;
    return (
      <section className={styles.moreAbout}>
        <header className={styles.moreAboutHeader}>
          <h4 dangerouslySetInnerHTML={{ __html: title }} ></h4>
          <p>{sectionSubtitle}</p>
        </header>

        {
          itemList.map(v =>
            <div className={styles.moreAboutContainer} key={uniqueId()}>
              <article>
                <img alt="" className={styles.moreAboutIcon} src={v.itemIconURL} />
                <Link
                  className={styles.moreAboutLink}
                  to={v.itemURL}
                  dangerouslySetInnerHTML={{ __html: v.itemTitle }}
                />
              </article>
            </div>
          )}

      </section>
    );
  }
}

MoreAboutObject.defaultProps = {
};

MoreAboutObject.propTypes = {
  fetchFeatured: func.isRequired,
  slugLookupId: number.isRequired,
  sectionObjectTitle: string,
  sectionTitle: string,
  sectionSubtitle: string,
  itemList: array,
};

const mapStateToProps = ({ featuredContent }) => ({
  ...featuredContent
});
const mapDispatchToProps = dispatch => (bindActionCreators(featuredContentActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MoreAboutObject);
