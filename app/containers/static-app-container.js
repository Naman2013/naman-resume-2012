import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Menu from './Menu';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { checkUser } from '../modules/User';

const { element, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkUser }, dispatch);
}

@connect(null, mapDispatchToProps)

export default class App extends Component {
  static propTypes = {
    children: element,
    checkUser: func.isRequired,
  };

  componentWillMount() {
    this.props.checkUser();
  }

  render() {
    const { children } = this.props;
    const displayTitle = !!children.props.route.subTitle;

    return (
      <div>
        <Header />
        <Menu source="nav.json" />
        <section className="static-app-content-container clearfix">
          <div className="clearfix">
            <article className="static-page">
              {
                displayTitle ?
                  <header className="static">
                    <div className="pull-left">
                      <h1>{children.props.route.title || ""}</h1>
                      <h2 className="text-regular">{children.props.route.subTitle || ""}</h2>
                    </div>
                    <Link to="about/contact" className="btn-primary pull-right">Contact Us</Link>
                  </header> : null
              }

              {children}

            </article>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
