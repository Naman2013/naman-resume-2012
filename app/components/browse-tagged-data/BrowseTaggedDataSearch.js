import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { fetchBrowseTaggedDataAction } from '../../modules/browse-tagged-data/actions';
import { white, sloohBlue } from '../../styles/variables/colors';

/*
const mapStateToProps = ({
  browseTaggedData,
}) => ({
  browseTaggedData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchBrowseTaggedDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps) */
class BrowseTaggedDataSearch extends Component {
  constructor(props) {
    super(props);

    this.topNavSearchEnabled = false;
    this.topNavSearchTerm = '';
  }

  componentDidMount() {
    this.topNavSearchTerm = '';
    this.topNavSearchEnabled = false;
  }

  handleFieldChange(searchData) {
    console.log("Search Text Changed: " + searchData.value);
    this.topNavSearchTerm = searchData.value;
    this.topNavSearchEnabled = true;
  }

  handleClick(searchData) {
      console.log("Click: " + searchData.value)
      this.topNavSearchTerm = searchData.value;
      this.topNavSearchEnabled = true;

      /* fetch the browse tagged data */
      //this.props.actions.fetchBrowseTaggedDataAction();
  }

  endSearch() {
    console.log('User selected to end the search');
    this.topNavSearchEnabled = false;
    this.topNavSearchTerm = '';
    document.getElementById('BrowseTaggedDataSearchInputField').value = '';
  }

  render() {
    return (
      <div className="search-site-bytags">
        <p className="search-text">Search:</p>
        <input
          id="BrowseTaggedDataSearchInputField"
          onClick={(event) => { this.handleClick({ value: event.target.value}); }}
          onChange={(event) => { this.handleFieldChange({ value: event.target.value }); }}
          type="text"
          className="search-input-field" />

        {this.topNavSearchEnabled == true && <div className="search-results-container">
            <Button style={{'marginLeft': '20px', 'marginBottom': '0px'}} className="btn-primary"
              onClick={(event) => { this.endSearch(); }}>
              Close/Cancel Search
            </Button>
            <h1 className="search-results-headertext">Browse / Search Results:</h1>
            <div className="search-results-set">
              my results....
            </div>
          </div>
        }
        <style jsx>{`
          .search-site-bytags {
            position: relative;
            max-width: 400px;
            min-width: 400px;
            display: inline;
          }

          .search-results-container {
            display: inline-block;
            min-height: 300px;
            border: 3px;
            border-color: ${white}
            background-color: ${sloohBlue};
            color: ${white};
            z-index: 1;
            max-width: 500px;
            min-width: 500px;
            margin-left: -100%;
            position: absolute;
            margin-top: 25px;
          }

          .search-results-set {
              margin-left: 20px;
              margin-top: 25px;
              overflow-y: scroll;
              min-height: 300px;
          }

          .search-results-headertext {
              text-decoration: underline;
              margin-left: 20px;
              font-size: 1.5em;
          }

          .search-text {
              color: ${white};
          }

          .search-input-field {
            background-color: gray;
            color: ${white}
            font-weight: bold;
          }
          `}</style>
      </div>
    );
  }
}

export default BrowseTaggedDataSearch;
