import React, { Component } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';

class GlobalNavigation extends Component {
  state = {
    isOpen: false,
  };

  handleToggleClick = event => {
    event.preventDefault();
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen } = this.state;

    return(
      <div className="root">
        <TopBar />

        <Menu position="left" isOpen={isOpen} />

        <button
          style={{ marginLeft: '600px' }}
          onClick={this.handleToggleClick}
        >
          Toggle Menu
        </button>
        <style jsx>{`
          .root {
            position: relative;
            height: 100vh;
            margin: 0;
            padding:0;
          }
        `}</style>
      </div>
    );
  }
}

export default GlobalNavigation;
