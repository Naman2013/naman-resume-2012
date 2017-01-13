import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from "./my-pictures-item.scss";

const MyPicturesItem = ({ data }) =>
  <div className={styles.MyPicturesItem} style={{backgroundImage: `url(${data.url})`,}}>
    <div className="row"> <b>{data.name} </b> <br/> {data.date} </div>
    <div className="row"><img src={data.icon} /></div>
    <div className="row">{data.fits ? <Link to="#">FITS</Link> : ""}</div>
  </div>;

export default MyPicturesItem;
