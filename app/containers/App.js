import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageMetaManagement from '../components/PageMetaManagement';
import Menu from './Menu';

import GlobalNavigation from '../components/GlobalNavigation';

import Footer from '../components/common/footer';
import { fetchEvents } from '../modules/upcoming-events/upcoming-events-actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEvents,
  }, dispatch);
}

function mapStateToProps({ isLanding }) {
  return {
    isLanding,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,
    children: PropTypes.node.isRequired,
    fetchEvents: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLanding: false,
  };

  constructor(props) {
    super(props);
    props.fetchEvents();
  }

  render() {
    const { isLanding } = this.props;
    return (
      <div className={`wrapper ${isLanding ? 'is-landing' : null}`}>
        <PageMetaManagement />

        <nav className="navigation">
          <GlobalNavigation />
        </nav>

        <section className="app-content-container clearfix">
          <div className="clearfix">
            { this.props.children }
          </div>
        </section>
        <Footer />

        <style jsx>{`
          .navigation {

          }
        `}</style>
      </div>
    );
  }
}

export default App;
