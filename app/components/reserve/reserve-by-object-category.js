import React,  { Component } from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import classnames from 'classnames';

class ReserveObjectsCategory extends Component {
  handleClickEvent(item) {
    return this.props.onClickHandler(item);
  }

  render() {
    const { items = [], selectedItem } = this.props;    

    return (
      <div className={styles.objectCategories}>
        <ul>
          {
            _.map(items, (item, i) => {
              
              // TODO: replace selectedItem.title === item.title with id comparisons
              const elementsStyles = classnames({
                item: true,
                selected: selectedItem.title === item.title
              });
              
              return (
                <li key={i} onClick={this.handleClickEvent(item)} className={elementsStyles}>
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
