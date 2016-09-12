import React, { Component } from 'react';
import { Link, Element } from 'react-scroll';
import style from './scroll-for-more.scss';

class ScrollForMore extends Component {
  render() {
    return(
      <div className="scroll-for-more">
        <Link
          href="#"
          to="scroll-more"
          spy={true}
          smooth={true}
          duration={500}
          className="button">
          Scroll for more<br />
          <span className="glyphicon glyphicon-menu-down"></span>
        </Link>
        <Element name="scroll-more" />
      </div>
    );
  }
}

export default ScrollForMore;
