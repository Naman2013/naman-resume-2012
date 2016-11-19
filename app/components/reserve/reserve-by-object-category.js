import React, {Component} from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import classnames from 'classnames';


class ReserveObjectsCategory extends Component {
  constructor(props) {
    super(props);
    
    this.state = { selectedCategory: {} };
  }

  handleClickEvent(item) {
    const preparedHandler = this.props.onClickHandler(item);
    
    return (evt) => {
      this.setState({
        selectedCategory: item
      });            

      preparedHandler(evt);
    }    
  }

  render() {
    const { items = [] } = this.props;
    const { selectedCategory } = this.state;

    return (
      <div className={styles.objectCategories}>
        <ul>
          {
            _.map(items, (item, i) => {
              
              // TODO: replace selectedCategory.title === item.title with id comparisons
              const elementsStyles = classnames({
                item: true,
                selected: selectedCategory.title === item.title
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
