import React, { Component, PropTypes } from 'react';

class ListObservatoryChildren extends Component {
  render() {
    return (
      <ul>
        {
          this.props.data.map((child, i) => (
            <li key={child.teleName}>
              <a className={`item scope-${child.teleOnlineStatus}`} href={child.telePageURL}>
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
