import React, { Component } from 'react';

const attachClickHandler = (ChildComponent, store) => {

  return class clickHandler extends Component {
    constructor(props) {
      super(props);
    }

    handleClickEvent(item) {
      return this.props.onClickHandler(item);
    }

    render() {
      return (
        <ChildComponent
          handleClickEvent={this.handleClickEvent.bind(this)}
          {...this.state}
          {...this.props} />
      );
    }
  };
};

export default (childComponent) => attachClickHandler(childComponent);