import React, { Component } from 'react';
import { Link } from 'react-router';

export default class StargazersChildren extends Component {
  render() {
    return (
      <div>
        <h3>Calling all Stargazers</h3>
        <p>Inspired by the night sky and its wonders? Choose an object and submit anything that moves you: an interesting fact, a photo, a short story, or even a sonnet—it’s all welcome in the Slooh community!</p>
        <Link to="publish-post">Create New Post</Link>
      </div>
    );
  }
}
