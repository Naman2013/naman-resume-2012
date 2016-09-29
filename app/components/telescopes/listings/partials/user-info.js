
import React, { Component } from 'react';

export default function UserInfo({ something }) {
  return (
    <div className="col-md-4 user-info">
      <div className="name">
        Dummy Name
      </div>
      <div>
        <span className="location">
          New Haven, CT, USA.
        </span>
        <span className="member-since">
          Member since 2015
        </span>
      </div>
    </div>
  );
}

