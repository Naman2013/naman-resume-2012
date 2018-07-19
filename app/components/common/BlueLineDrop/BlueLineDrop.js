/***********************************
* V4 Mission Detail List populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './BlueLineDrop.style';

const {
  bool,
  func,
  string,
} = PropTypes;

class BlueLineDrop extends Component {
  static propTypes = {
    isDesktop: bool,
    title: string,
    render: func.isRequired,
  }

  static defaultProps = {
    isDesktop: false,
    title: '',
  };

  state = {
    showInfo: !this.props.isDesktop,
  };

  toggleInfo = (e) => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo,
    }));
  }



  render() {
    const {
      isDesktop,
      title,
      render,
    } = this.props;
    const { showInfo } = this.state;
    return (<div className={classnames({
      'component-container': isDesktop,
    })}>
      {isDesktop ? <div className="title-container">
        <span className="title" dangerouslySetInnerHTML={{ __html: title}} />
        <img
          className={classnames('action', {
            up: showInfo,
          })}
          onClick={this.toggleInfo}
          src="https://vega.slooh.com/assets/v4/common/arrow_down.svg"
        />
      </div> : null}

      {showInfo ? <div className="container-detail-items">
        {render()}
      </div> : null}
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BlueLineDrop;
