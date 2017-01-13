import React from 'react';
import { Link } from 'react-router';

const StargazersChildren = () => (
  <div>
    <h3 className="menu-title">Calling all Stargazers</h3>
    <div className="static-item">
      <p className="body">
        Inspired by the night sky and its wonders?
        Choose an object and submit anything that moves you: an interesting fact,
        a photo, a short story, or even a sonnet—it’s all welcome in the Slooh community!
      </p>
    </div>
    <Link className="item" to="publish-post">Create New Post</Link>
  </div>
);

export default StargazersChildren;
