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
        <div>          
          <h2 className="utc-time">{this.state.date.format("HH:mm")} UTC</h2>

          <style jsx>
              {`
                .utc-time{
                    font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 20px;
                  color: rgb(37, 52, 70); 
                  margin-top: 17px; 
                  margin-right:5px;
                  text-align: center;
                }

                @media ${screenMobile} {
                    .utc-time{                        
                      font-size: 14px;
                      line-height: 18px; 
                      margin-top: 12px;
                    }
                }

                @media ${screenTablet} {
                    .utc-time{                        
                      font-size: 14px;
                      line-height: 18px;
                      margin-top: 12px;
                    }
                }
              `}

          </style>
        </div>
      );
    }
  }  
  