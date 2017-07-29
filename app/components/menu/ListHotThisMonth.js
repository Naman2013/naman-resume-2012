import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
          this.state.hotList.map((el) => (
            <li key={el.title}>
              <a className="item" href={el.hotURL}>
                <span className="hot-title">{el.title}</span>
              </a>
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
