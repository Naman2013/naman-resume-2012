import React, {Component} from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import ObjectListItems from './object-list-items';
import classnames from 'classnames';

class ReserveObjectsList extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(subCategoryIndex, item, itemIndex) {
    this.props.onClickHandler({
      item,
      itemIndex: itemIndex,
      subcategoryIndex: subCategoryIndex
    });
  }
  
  render() {
    const { selectedCategory, selectedObject } = this.props;
    const objects = selectedCategory.item ? selectedCategory.item.objects : [];

    return (
      <div className={styles.objectList}>
        <ul className="no-padding">
          {
            _.map(objects, (obj, i) => {
              return (
                <li key={ i } className="sub-category">
                  
                  <span className="sub-category-title">{ obj.title }</span>
                  
                  <ObjectListItems
                    items={ obj.items }
                    selectedSubCategory={ selectedObject.subcategoryIndex === i }
                    selectedItemIndex={ selectedObject.itemIndex }
                    handleClickEvent={ (item, index) => { this.clickHandler(i, item, index); } } />
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
