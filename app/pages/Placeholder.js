import React, { Component } from 'react';

class Placeholder extends Component {

  componentDidMount() {
    
  }

  render() {
    const heroContainerStyle = {
      background: `url(https://polaris.slooh.com/events/dev101/heroes/stargazers-bg.png) center/cover no-repeat`,
    };

    return (
      <div className="root">
        <div className="title-text-container">
          <span className="title-text">This page is coming soon</span>
        </div>
        <video id="heroInspireVideoBackground" playsInline autoPlay muted loop>
          <source src="https://vega.slooh.com/video/home/stars-high-720.webm" type="video/webm" />
          <source src="https://vega.slooh.com/video/home/stars-high-720.mp4" type="video/mp4" />
        </video>
        <style jsx>{`
          .root {
            position: relative;
          }
          .title-text-container {
            position: absolute;
            top: 100px;
            left: 0;
            width: 100%;

          }

          .title-text {
            display: block;
            color: white;
            width: 100%;
            text-align: center;
            font-size: 30px;
          }
        `}</style>
      </div>
    );
  }
}


export default Placeholder;
