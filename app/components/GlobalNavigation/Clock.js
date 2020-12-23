import moment from "moment";
import React, { Component } from "react";
import {
    screenMobile,
    screenTablet,
  } from 'app/styles/variables/breakpoints';

export default class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: moment.utc()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        this.props.interval
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: moment.utc()
      });
    }
  
    render() {        
      return (
        <div className="clock-div">          
          <h2 className="utc-time">{this.state.date.format("HH:mm")} UTC</h2>

          <style jsx>
              {`
                .clock-div{
                    height: 60px;
                    display: flex;
                    align-items: center;
                }

                .utc-time{
                    font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 18px;
                  color: rgb(37, 52, 70);  
                  margin-left: 5px;                 
                  margin-right: 5px;
                  text-align: center;
                  margin-bottom: 0px;
                }

                @media ${screenMobile} {
                    .utc-time{                        
                      font-size: 10px;
                      line-height: 14px;                       
                    }
                }

                @media ${screenTablet} {
                    .utc-time{                        
                      font-size: 14px;
                      line-height: 18px;                      
                    }
                }
              `}

          </style>
        </div>
      );
    }
  }  
  