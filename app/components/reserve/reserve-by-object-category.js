import React,  { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';
import classnames from 'classnames';

class ReserveObjectsCategory extends Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(item, itemIndex) {
    this.props.onClickHandler({
      item,
      itemIndex,
    });
  }

  isItemSelected(index) {
    const { selectedCategory } = this.props;
    return selectedCategory && selectedCategory.itemIndex === index;
  }

  getElementStyles(index) {
    const { selectedCategory } = this.props;
    return classnames({
      item: true,
      selected: this.isItemSelected(index)
    });
  }

  render() {
    const { items = [], onClickHandler } = this.props;

    return (
      <div className={styles.objectCategories}>
        <ul>
          {
            items.map((item, index) => (
              <li
                key={index}
                onClick={() => {this.clickHandler(item, index)}}
                className={this.getElementStyles(index)}
              >
                <img className="icon" src={item.categoryIcon} /> {item.title}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const { array, number, string, bool, func, shape } = PropTypes;
ReserveObjectsCategory.propTypes = {
  items: array,
  selectedCategory: shape({
    itemIndex: number,
  }),
  onClickHandler: func.isRequired,
};

export default ReserveObjectsCategory;
