import React, { Component } from 'react';
import { Link } from 'react-router';

export default function ReserveControllers({ isExpanded, closeHandler }) {
  return (
    <div className="col-md-6 reserve-controller">
      <ul className="list-inline">
        <li>
          <Link className="btn btn-default" to="">
            Browse Objects
          </Link>
        </li>

        <li>
          <Link className="btn btn-default" to="">
            Select By Catalog #
          </Link>
        </li>

        <li>
          <Link className="btn btn-default" to="">
            Enter Coordinates
          </Link>
        </li>

        {
          (() => {
            function closeItem(evt){
              closeHandler(evt, true);
            }
               
            if (isExpanded) {
              return (
                <li onClick={closeItem}>
                  <img src="assets/icons/close-btn.png" alt="close this item" />
                </li>
              );
            }
          })()
        }
      </ul>      
    </div>
  );
}
