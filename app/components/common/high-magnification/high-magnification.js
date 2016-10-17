import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './high-magnification.scss';

class HighMagnification extends Component {

  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      classes: []
    };
  };

  handleMouseOver() {
    var classes = this.state.classes;
    classes.push('hover');

    this.setState({ classes: classes });
  };

  handleMouseOut() {
    var classes = this.state.classes;
    var index = classes.indexOf('hover');
    classes.splice(index, 1);

    this.setState({ classes: classes });
  }

  render() {

    let cx = classnames({
      [`high-magnification ${this.props.className}`]: true
    })

    return(
      <div className={cx} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>

        <InteractivePanel>
          <div className="main-container">
            <img src={'/assets/images/graphics/magnification-scene.jpg'}  />
          </div>
        </InteractivePanel>

        <div className={classnames('icons', this.state.classes)}>
          <img src={'/assets/images/icons/icon-magnification-minus.png'} className="minus" />
          <img src={'/assets/images/icons/icon-magnification-plus.png'} className="plus" />
          <img src={'/assets/images/icons/icon-snapshot.png'} className="snapshot" />
          <img src={'/assets/images/icons/icon-circular-view.png'} className="circular-view" />
          <img src={'/assets/images/icons/icon-screen-view.png'} className="screen-view" />
        </div>
      </div>
    );
  }
}

export default HighMagnification;
