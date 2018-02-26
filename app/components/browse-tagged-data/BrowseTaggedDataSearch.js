import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { fetchBrowseTaggedDataAction } from '../../modules/browse-tagged-data/actions';
import { white, sloohBlue } from '../../styles/variables/colors';

const propTypes = {
  topNavSearchEnabled: PropTypes.bool,
  topNavSearchTerm: PropTypes.String,
  topNavSearchResults: PropTypes.shape({

  }),
  browseTaggedData: PropTypes.shape({

  }),
};

const defaultProps = {
  topNavSearchEnabled: false,
  topNavSearchTerm: '',
  topNavSearchResults: { },
  browseTaggedData: { },
};

const mapStateToProps = ({ browseTaggedData }) => ({
  browseTaggedData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchBrowseTaggedDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class BrowseTaggedDataSearch extends Component {
  state = {
    topNavSearchEnabled: this.props.topNavSearchEnabled,
    topNavSearchTerm: this.props.topNavSearchTerm,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      topNavSearchTerm: '',
      topNavSearchEnabled: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    /* do a deep comparision on the next data coming in to see if it's different. */
    var equal = require('deep-equal');

    if (equal( this.props.browseTaggedData, nextProps.browseTaggedData ) == false) {
      console.log('Browse Tagged Data has changed...');
      console.log(this.props.browseTaggedData);
      console.log(nextProps.browseTaggedData);

      /* build an internal object structure based on the search term entered so the rendering can be done against that object instead of the complete data stream (ex: filter on Jupiter) */
      
    }
  }

  handleFieldChange(searchData) {
    console.log("Search Text Changed: " + searchData.value);
    this.setState({
      topNavSearchTerm: searchData.value,
      topNavSearchEnabled: true,
    });
  }

  handleClick(searchData) {
      console.log("Click: " + searchData.value)

      const { topNavSearchEnabled } = this.state;

      /* only fetch the browse tagged data if the search has not already been iniated,
        this will prevent multiple data calls when a user clicks in the text box when the results are already active. */
      if (topNavSearchEnabled != true) {
        this.setState({
          topNavSearchTerm: searchData.value,
          topNavSearchEnabled: true,
        });

        /* fetch the browse tagged data */
        this.props.actions.fetchBrowseTaggedDataAction();
      }
  }

  endSearch() {
    console.log('User selected to end the search');
    this.setState({
      topNavSearchTerm: '',
      topNavSearchEnabled: false,
    });
    document.getElementById('BrowseTaggedDataSearchInputField').value = '';
  }

  render() {
    const { topNavSearchTerm, topNavSearchEnabled } = this.state;
    const { browseTaggedData } = this.props;

    return (
      <div className="search-site-bytags">
        <p className="search-text">Search:</p>
        <input
          id="BrowseTaggedDataSearchInputField"
          onClick={(event) => { this.handleClick({ value: event.target.value}); }}
          onChange={(event) => { this.handleFieldChange({ value: event.target.value }); }}
          type="text"
          className="search-input-field" />

        {topNavSearchEnabled == true && <div className="search-results-container">
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
            display: inline-block;
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
            margin-left: -160px;
            position: absolute;
            margin-top: 30px;
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
              margin-top: 20px;
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
