import React, { Component, PropTypes } from 'react';

const { number, string } = PropTypes;

export default class circlecounter extends Component {
  static propTypes = {
    progress: number,
    total: number,
    size: number,
    lineWidth: number,
    progressColor: string,
  };

  static defaultProps = () => ({
    progress: 0,
    lineWidth: 5,
    size: 200,
  });

  getPoint(r, degree) {
    const { props: { size, lineWidth } } = this;

    const d = (degree / 180) * Math.PI;

    return {
      x: (r * Math.sin(d)) + (size / 2),
      y: (lineWidth / 2) + (r * (1 - Math.cos(d))),
    };
  }

  render() {
    const {
      props: {
        progress,
        total,
        size,
        lineWidth,
        progressColor,
      },
    } = this;

    const r = (size / 2) - (lineWidth / 2);
    const endDegree = ((progress * 360) / total);
    const s = this.getPoint(r, 0);
    const e = this.getPoint(r, endDegree);
    const cornersWidth = lineWidth / 2;

    let progressPath = null;
    if (progress < total / 2) {
      progressPath = `M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}`;
    } else {
      const m = this.getPoint(r, 180);

      progressPath = `
        M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${m.x},${m.y}
        M ${m.x} ${m.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}
      `;
    }

    const progressStyle = {
      strokeWidth: lineWidth,
      stroke: progressColor,
      fill: 'none',
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ position: 'absolute' }}
        >
          {progress > 0 ?
            <path
              d={progressPath}
              style={progressStyle}
            />
          : null}
          {progress > 0 ?
            <circle
              cx={s.x}
              cy={s.y}
              r={cornersWidth}
              fill={progressColor}
            />
          : null}
          {progress > 0 ?
            <circle
              cx={e.x}
              cy={e.y}
              r={cornersWidth}
              fill={progressColor}
            />
          : null}
        </svg>
        {this.props.children}
      </div>
    );
  }
}