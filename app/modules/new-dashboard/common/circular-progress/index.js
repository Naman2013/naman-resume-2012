
import React, { Component } from "react";
import "./style.css";
import classnames from 'classnames';

class CircularProgressBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      // Size of the enclosing square
      const sqSize = this.props.sqSize;
      // SVG centers the stroke width on the radius, subtract out so circle fits in square
      const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
      // Enclose cicle in a circumscribing square
      const viewBox = `0 0 ${sqSize} ${sqSize}`;
      // Arc length at 100% coverage is the circle circumference
      const dashArray = radius * Math.PI * 2;
      // Scale 100% coverage overlay with the actual percent
      const dashOffset = dashArray - dashArray * this.props.percentage / 100;
    
      const { percentage, totalValue, currentValue } = this.props;

      return (
        <svg
            width={this.props.sqSize}
            height={this.props.sqSize}
            viewBox={viewBox}>
            <circle
              className="circle-background"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`} />
            <circle
                className={classnames('circle-progress',
                {"circle-green": percentage < 51},
                {"circle-orange": percentage > 50 && percentage < 76},
                {"circle-red": percentage > 75},
                )}
            //   className="circle-progress"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset
              }} />
            <text
            //   className="circle-text"
              className={classnames('circle-text',
                {"green": percentage < 51},
                {"orange": percentage > 50 && percentage < 76},
                {"red": percentage > 75},
                )}
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle">
              {`${currentValue}/${totalValue}`}
            </text>
        </svg>
      );
    }
  }
  
  CircularProgressBar.defaultProps = {
    sqSize: 50,
    percentage: 25,
    strokeWidth: 5,
    totalValue: 5,
    currentValue: 2,
  };

  export default CircularProgressBar;