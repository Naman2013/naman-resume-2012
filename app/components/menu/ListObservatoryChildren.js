import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import purgeHashURL from '../../utils/purgeHashURL';

class ListObservatoryChildren extends Component {
  render() {
    return (
      <ul>
        {
          this.props.data.map((child, i) => (
            <li key={child.teleName}>
              <Link
                className={`item scope-${child.teleOnlineStatus}`}
                to={purgeHashURL(child.teleDetailsURL)}
              >
                {child.teleName}
              </Link>
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
