import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class StargazersInfo extends Component {
  state = {
    title: [],
    stargazersList: [],
  };

  componentDidMount() {
    this.serverRequest();
  }

  serverRequest() {
    axios.get(this.props.source)
    .then((response) => {
      this.setState({
        stargazersDescription: response.data.description,
        stargazersTitle: response.data.title,
      });
    });
  }

  render() {
    const {
      stargazersTitle,
      stargazersDescription,
    } = this.state;
    return (
      <li>
        <h3 className="menu-title">{stargazersTitle}</h3>
        <div className="static-item">
          <p className="body">
            {stargazersDescription}
          </p>
        </div>
      </li>
    );
  }
}

StargazersInfo.propTypes = {
  source: PropTypes.string.isRequired,
};

export default StargazersInfo;
