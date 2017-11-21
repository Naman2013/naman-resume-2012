import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import { pink, white, darkBlueGray } from '../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;
class SharedPicturesTimeline extends Component {

  static propTypes = {
    timelineCount: number.isRequired,
    timelineList: arrayOf(shape({
      label: string.isRequired,
      imageIndex: number.isRequired,
    })),
    changeMainSlider: func.isRequired,
  };

  static defaultProps = {
    timelineList: [],
  };

  state = {
    currentIndex: this.props.timelineList.length > 0 ? this.props.timelineList.length - 1 : 0,
    dragged: false,
  }

  componentWillReceiveProps = (nextProps) => {
    const { timelineList } = nextProps;

    if (timelineList.length !== this.props.timelineList.length) {
      this.setState({
        currentIndex: timelineList.length-1,
      });
    }
  }

  changeActiveItem = (e, currentIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.dragged) return;
    const {
      changeMainSlider,
      timelineList,
    } = this.props;

    this.setState({
      currentIndex,
    });

    changeMainSlider(timelineList[currentIndex])
  }

  onDrag = () => {
    this.setState({
      dragged: true,
    });
  }

  onItemMouseDown = () => {
    this.setState({
      dragged: false,
    });
  }

  render() {
    const {
      timelineCount,
      timelineList
    } = this.props;
    const { currentIndex } = this.state;

    const timelineItemClass = (arrayIdx) => {
      return classnames('timeline-item', {
        'timeline-active-item': arrayIdx === currentIndex,
      })
    };

    const containerWidth = 780;
    const numDatesToShow = timelineCount <= 12 ? timelineCount : 12;
    const width = containerWidth / numDatesToShow;
    const leftBound = timelineCount <= 12 ? 0 : -((width * (timelineCount - (numDatesToShow))) / 2);
    const rightBound = timelineCount <= 12 ? 0 : (width * (timelineCount - (numDatesToShow))) / 2;

    return (
      <div className="shared-timeline-container" style={{ maxWidth: `${containerWidth}px` }}>
        {timelineList.length > 0 && <Draggable
          axis="x"
          handle=".handle"
          onDrag={this.onDrag}
          grid={[width/2, width/2]}
          defaultPosition={{ x: leftBound, y: 0 }}
          bounds={{
            left: leftBound,
            right: rightBound,
          }}
        >
          <div className="handle timeline-items">
            {timelineList.map((date, i) => (<div
              onClick={(e) => this.changeActiveItem(e, i)}
              style={{ width: `${width}px`, fontSize: numDatesToShow > 6 ? '.8rem' : 'inherit' }}
              key={date.imageIndex}
              className={timelineItemClass(i)}
              dangerouslySetInnerHTML={{
                __html: date.label
              }}
              onMouseDown={this.onItemMouseDown}
            />))}
          </div>
        </Draggable>}
        <style jsx>{`

          .shared-timeline-container {
            margin: 0 auto;
            margin-top: 15px;
            overflow: hidden;
          }
          .timeline-item {
            cursor: pointer;
            border: 1px solid ${white};
            padding: 15px 25px;
          }

          .timeline-items {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }

          .timeline-active-item {
            background-color: ${pink};
            color: ${white};
            font-weight: bold;
          }

        `}</style>
      </div>
    );
  }
}

export default SharedPicturesTimeline;
