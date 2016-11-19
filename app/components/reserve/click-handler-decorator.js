import React, { Component } from 'react';

const attachClickHandler = (ChildComponent, store) => {

  return class clickHandler extends Component {
    constructor(props) {
      super(props);

      this.state = { selectedItem: {} };
    }

    handleClickEvent(item) {
      const preparedHandler = this.props.onClickHandler(item);

      return (evt) => {
        this.setState({
          selectedItem: item
        });

        preparedHandler(evt);
      };
    }

    render() {
      return <ChildComponent handleClickEvent={this.handleClickEvent.bind(this)} {...this.props} {...this.state} />;
    }
  };
};

export default (childComponent) => attachClickHandler(childComponent);