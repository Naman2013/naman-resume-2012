import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListObservatoryChildren extends Component {
  render() {
    return (
      <ul>
        {
          this.props.data.map((child, i) => (
            <li key={child.teleName}>
              <a className={`item scope-${child.teleOnlineStatus}`} href={child.teleDetailsURL}>
                {child.teleName}
              </a>
            </li>
          ))
        }
      </ul>
    );
  }
}

ListObservatoryChildren.defaultProps = {
  data: {},
};

ListObservatoryChildren.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      child: PropTypes.shape({
        teleName: PropTypes.string,
        teleOnlineStatus: PropTypes.string,
      }),
    }),
  ),
};

export default ListObservatoryChildren;
