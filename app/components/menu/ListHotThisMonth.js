import React, { Component } from 'react';
import StargazersChildren from './StargazersChildren';
import MenuSearch from './MenuSearch';
import MenuSocial from './MenuSocial';
import axios from 'axios';

export default class ListHotThisMonth extends Component {
  state = {
    title: [],
    hotList: [],
  };

  componentDidMount() {
    this.serverRequest();
  }

  serverRequest = () => {
    axios.get(this.props.source) 
     .then(response => {
      this.setState({
        hotList: response.data.hotPosts,
        hotTitle: response.data.hotTitle,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
 
  };

  render() {
    const hotTitle = this.state.hotTitle;

    return (
      <div>
        <h3>{hotTitle}</h3>
        {this.state.hotList.map((el, i) => {
          return (
            <div key={i}>
              <p>
                <a href={el.hotURL}>
                  <span className="hot-title">{el.title}</span>
                </a>
              </p>
            </div>
          );
        })}
        <StargazersChildren />
        <MenuSearch />
        <MenuSocial />
      </div>
    );
  }
}
