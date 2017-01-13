import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import StargazersChildren from './StargazersChildren';
import MenuSocial from './MenuSocial';

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
          this.state.hotList.map((el, i) => (
            <li key={i}>
              <a className="item" href={el.hotURL}>
                <span className="hot-title">{el.title}</span>
              </a>
            </li>
          ))
        }
        </ul>
        <StargazersChildren />
        <MenuSocial />
      </li>
    );
  }
}

ListHotThisMonth.propTypes = {
  source: PropTypes.string.isRequired,
};

export default ListHotThisMonth;
