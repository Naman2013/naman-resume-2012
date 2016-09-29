import React, { Component } from 'react';
import { Link } from 'react-router';

export default function ReserveControllers({ something }) {
  return (
    <div className="col-md-6 reserve-controller">
      <ul className="list-inline">
      	<li>
      		<Link className="btn btn-default">
      			Browse Objects
      		</Link>
      	</li>

      	<li>
      		<Link className="btn btn-default">
      			Select By Catalog #
      		</Link>
      	</li>

      	<li>
      		<Link className="btn btn-default">
      			Enter Coordinates
      		</Link>
      	</li>
      </ul>
    </div>
  );
}

