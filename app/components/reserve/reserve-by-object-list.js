import React, {Component} from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import ObjectListItems from './object-list-items';
import classnames from 'classnames';

class ReserveObjectsList extends Component {
  handleClickEvent(item) {
    return this.props.onClickHandler(item);
  }
  
  render() {
    const { objects = [], selectedItem } = this.props;

    return (
      <div className={styles.objectList}>
        <ul className="no-padding">
          {
            _.map(objects, (obj, i) => {
              return (
                <li key={i} className="sub-category">
                  
                  <span className="sub-category-title">{obj.title}</span>
                  
                  <ObjectListItems
                    items={obj.items}
                    selectedItem={selectedItem}
                    handleClickEvent={this.handleClickEvent.bind(this)} />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  } 
}

export default ReserveObjectsList;
