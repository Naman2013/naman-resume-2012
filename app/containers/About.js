import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/menu.scss';

class MenuComponent extends Component {

  render() {
    const {children} = this.props;
    return (
        <article className="static-page">
            <header className="static">
                <div className="pull-left">
                    <h1>{children.props.route.title || ""}</h1>
                    <h2 className="text-regular">{children.props.route.subTitle || ""}</h2>
                </div>

                <Link to="about/contact" className="btn-primary pull-right">Contact Us</Link>

            </header>
            {children}
        </article>
    );
  }
}

export default MenuComponent;
