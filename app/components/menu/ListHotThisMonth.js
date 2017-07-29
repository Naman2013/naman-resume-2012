import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import purgeHashURL from '../../utils/purgeHashURL';

class ListHotThisMonth extends Component {
  state = {
    title: [],
    hotList: [],
  };

  componentDidMount() {
    this.serverRequest();
  }

  serverRequest() {
    axios.get(this.props.source)
    .then((response) => {
      this.setState({
        hotList: response.data.hotPosts,
        hotTitle: response.data.hotTitle,
      });
    });
  }

  render() {
    const hotTitle = this.state.hotTitle;
    return (
      <li>
        <h3 className="menu-title">{hotTitle}</h3>
        <ul>
          {
            this.state.hotList.map(el => (
              <li key={el.title}>
                <Link to={purgeHashURL(el.hotURL)} className="item">
                  <span className="hot-title">{el.title}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </li>
    );
  }
}

ListHotThisMonth.propTypes = {
  source: PropTypes.string.isRequired,
};

export default ListHotThisMonth;
