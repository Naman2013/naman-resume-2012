import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import noop from 'lodash/noop';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
import UnderlineNav from 'components/common/UnderlineNav';
import { seashell } from 'styles/variables/colors_tiles_v4';
import style from './HubContainer.style';

const {
  number,
  arrayOf,
  string,
  func,
} = PropTypes;

class HubContainer extends Component {

  static propTypes = {
    hubTitle: string,
  };

  static defaultProps = {
    hubTitle: '',
  };

  state = {
  }

  handleClick = (idx) => {

  }

  render() {
    const {
      hubTitle,
    } = this.props;

    const { activeIndex } = this.state;

    return (
      <div className="root">
        <HubHeader
          icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
          title={hubTitle}
          renderNav={() => (<UnderlineNav navItems={[]} />)}
        />
        <CenterColumn
          theme={{ backgroundColor: seashell }}
        >
        </CenterColumn>
        <style jsx>{style}</style>
      </div>
    )
  }
}



export default HubContainer;
