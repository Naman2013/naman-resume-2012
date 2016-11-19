import React, {Component} from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';
import classnames from 'classnames';

class ReserveObjectsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {}
    }
  }

  handleClickEvent(item) {
    const preparedHandler = this.props.onClickHandler(item);

    return (evt) => {
      preparedHandler(evt);

      this.setState({
        selectedItem: item
      });
    }
  }
  
  render() {
    const { objects = [] } = this.props;
    const { selectedItem = {} } = this.state;

    return (
      <div className={styles.objectList}>
        <ul className="no-padding">
          {
            _.map(objects, (obj, i) => {
              return (
                <li key={i} className="sub-category">
                  <span className="sub-category-title">{obj.title}</span>
                  <ul className="object-items">

                  {
                    _.map(obj.items, (item, i) => {
                      
                      // TODO: replace selectedItem.title === item.title with id comparisons
                      const elementStyles = classnames({
                        'object-item': true,
                        selected: selectedItem.title === item.title
                      });

                      return (
                        <li
                          className={elementStyles}
                          key={i}
                          onClick={this.handleClickEvent(item)}>
                          {item.title}
                        </li>
                      );
                    })
                  }

                  </ul>
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
