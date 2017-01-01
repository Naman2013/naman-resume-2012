import React, { Component, PropTypes } from 'react';
import LiveCommunity from './live-community';
import styles from './live-club.scss';

const list = [{
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}, {
  text: "The eclipse is starting to go, It’s amazing to just see it happening on #Slooh LIVE! My sister in Los Angeles is going to miss it because of the weather today… too bad sis! #amazing #wishyouwerehere #eclipse #alienseat the sun #sciencerocks",
  name: "Jenny Baker",
  instagram: "@jenniebaker",
  img: ""
}];

const LiveClub = () =>
  <section className={styles.liveClub}>

    <nav className={styles.liveClubTabs}>
      <ul>
        <li className="hide">Social Flow</li>
        <li className="active">Perspectives</li>
        <li className="hide">World View</li>
        <li>Upcoming Shows</li>
        <li>Slooh Recommends</li>
      </ul>
    </nav>

    <LiveCommunity list={list}/>

  </section>;


export default LiveClub;
