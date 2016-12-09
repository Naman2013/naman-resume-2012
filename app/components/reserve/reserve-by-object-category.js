import React,  { Component } from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import classnames from 'classnames';

class ReserveObjectsCategory extends Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(item, i) {
    this.props.onClickHandler({
      item,
      itemIndex: i
    });
  }

  isItemSelected(selectedCategory, index) {
    return selectedCategory && selectedCategory.itemIndex === index;
  }

  getElementStyles(selectedCategory, index) {
    return classnames({
      item: true,
      selected: this.isItemSelected(selectedCategory, index)
    });
  }

  render() {
    const { items = [], selectedCategory, onClickHandler } = this.props;

    return (
      <div className={styles.objectCategories}>
        <ul>
          {
            _.map(items, (item, i) => {
              return (
                <li
                  key={i}
                  onClick={ () => { this.clickHandler(item, i); } }
                  className={this.getElementStyles(selectedCategory, i)}>
                  <img className="icon" src={item.categoryIcon} /> {item.title}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default ReserveObjectsCategory;
