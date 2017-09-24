import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PageMetaManagement from '../components/PageMetaManagement';
import Menu from './Menu';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { fetchEvents } from '../modules/upcoming-events/upcoming-events-actions';

const propTypes = {
  isLanding: PropTypes.bool,
  children: PropTypes.node.isRequired,
  fetchEvents: PropTypes.func.isRequired,
};

const defaultProps = {
  isLanding: false,
};

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
  constructor(props) {
    super(props);
    props.fetchEvents();
  }

  render() {
    const { isLanding } = this.props;
    return (
      <div className={`wrapper ${isLanding ? 'is-landing' : null}`}>
        <PageMetaManagement />
        <Header />
        <Menu source="nav.json" />
        <section className="app-content-container clearfix">
          <div className="clearfix">
            { this.props.children }
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
