import React, { Component } from 'react';

class LiveSign extends Component {
  render() {
    return (
      <div className="signContainer">
        <div className="circle circle_blink" />
        <div className="liveSignContainer" >
          <div className="liveSign">
            <div className="">LIVE</div>
          </div>
        </div>
        <style jsx>{
            `
            .signContainer {
              position: absolute;
              top: 20px;
              text-align: center;
              margin-left: 683px;
              background: none;
              padding: 5px;
              width: 270px;
              overflow: hidden;
            }

            .liveSignContainer {
              text-align: center;
              width: 80px;
              height: 40px;
              padding: 3px 3px 3px 3px;
              border-radius: 25px;
              background: #E50E0E;
              -moz-box-shadow:    inset 0 0 5px #000000;
              -webkit-box-shadow: inset 0 0 5px #000000;
              box-shadow:         inset 0 0 5px #000000;
              overflow: hidden;
            }

            .circle{
              width: 17px;
              height: 17px;
              border-radius: 50px;
              font-size: 20px;
              line-height: 100px;
              text-align: center;
              background: #E50E0E;
              margin: 12px 10px 0px 0px;
              float: left;
              -moz-box-shadow:    inset 0 0 5px #000000;
              -webkit-box-shadow: inset 0 0 5px #000000;
              box-shadow:         inset 0 0 5px #000000;
            }

            .circle_blink {
              animation: circle_blinker 4s ease infinite;
            }

            @keyframes circle_blinker {
              50% { opacity: 0; }
            }

            .liveSign {
              color: white;
              font-family: 'Oswald', sans-serif;
              font-weight: 700;
              font-size: 24px;
              padding: 1px;
            }
            `
        }</style>
      </div>
    );
  }
}

export default LiveSign;
