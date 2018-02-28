import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { fetchBrowseTaggedDataAction } from '../../modules/browse-tagged-data/actions';
import { black, white, sloohBlue } from '../../styles/variables/colors';


const mapStateToProps = ({
  browseTaggedData,
  renderTaggedData,
}) => ({
  browseTaggedData,
  renderTaggedData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchBrowseTaggedDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class BrowseTaggedDataSearch extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    topNavSearchTerm: '',
    topNavSearchEnabled: false,
    renderTaggedData: {
      taggedData: { },
    },
    grandParentNodeID: null,
    parentNodeID: null,
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    /* do a deep comparision on the next data coming in to see if it's different. */
    var equal = require('deep-equal');
    if (equal( this.props.browseTaggedData, nextProps.browseTaggedData ) == false) {
      //console.log('Browse Tagged Data has changed...');
      //console.log(this.props.browseTaggedData);
      //console.log(nextProps.browseTaggedData);

      //set the default rendered state (search results data feed to the render data feed)
      this.setState({
        renderTaggedData: nextProps.browseTaggedData,
      });
    }
  }

  handleFieldChange(searchData) {
    console.log("Search Text Changed: " + searchData.value);

    this.setState({
      topNavSearchTerm: searchData.value,
      topNavSearchEnabled: true,
    });

    /* build an internal object structure based on the search term entered so the rendering can be done against that object instead of the complete data stream (ex: filter on Jupiter) */
    if (searchData.value.length === 0) {
      /* render the entire browse tagged data set as their is no search term limiting the results */
      this.setState({
        renderTaggedData: this.props.browseTaggedData,
        grandParentNodeID: null,
        parentNodeID: null,
      });
    }
    else {
      //reset the grandparent and parent node selections a user has previous made as a new search was executed.
      this.setState({
        grandParentNodeID: null,
        parentNodeID: null,
      });

      /* build the render data set based on the search term so the search results list gets refined based on the new data feed results */
      var tmpRenderedDataObj = {
        'taggedData': {

        }
      };

      this.setState({
        renderTaggedData: tmpRenderedDataObj,
      });
    }
  }

  handleClick(searchData) {
      //console.log("Click: " + searchData.value)

      const { topNavSearchEnabled } = this.state;

      /* only fetch the browse tagged data if the search has not already been iniated,
        this will prevent multiple data calls when a user clicks in the text box when the results are already active. */
      if (topNavSearchEnabled != true) {
        this.setState({
          topNavSearchTerm: searchData.value,
          topNavSearchEnabled: true,
          grandParentNodeID: null,
          parentNodeID: null,
        });

        /* fetch the browse tagged data */
        this.props.actions.fetchBrowseTaggedDataAction();
      }
  }

  endSearch() {
    //console.log('User selected to end the search');
    this.setState({
      topNavSearchTerm: '',
      topNavSearchEnabled: false,
      grandParentNodeID: null,
      parentNodeID: null,
    });
    //document.getElementById('BrowseTaggedDataSearchInputField').value = '';
  }

    changeGrandParentNodeID(grandParentKey) {
      const { grandParentNodeID } = this.state;

      /* detect changes in the grand parent key */
      if ( (grandParentNodeID === null) || (grandParentNodeID != grandParentKey) ) {
        /* select the grand parent node */
        this.setState({ grandParentNodeID: grandParentKey, parentNodeID: null });
      }
      else {
        /* un-select the grand parent node */
        this.setState({ grandParentNodeID: null, parentNodeID: null });
      }
    }

    changeParentNodeID(parentKey) {
      const { parentNodeID } = this.state;

      if ( (parentNodeID === null) || (parentNodeID != parentKey) ) {
        /* select the parent node */
        this.setState({ parentNodeID: parentKey });
      }
      else {
        /* un-select the parent node */
        this.setState({ parentNodeID: null });
      }
    }

    renderTaggedDataDisplay() {
        const { topNavSearchTerm, topNavSearchEnabled, renderTaggedData } = this.state;
        const { browseTaggedData } = this.props;

        /**************************************************************************************
        Use cases:
          noSearchTerm Use Cases:
              grandParent=null and parent=null: show top level nodes only
              grandParent=x and parent=null: show grandParent expanded one level (show parents)
              grandParent=x and parent=y: show child nodes and links

          searchTerm Use Cases:
            Scan through all child nodes at the grandparent/parent level to see if there are any child objects that
              .... begin with noSearchTerm (use browseTaggedData to build renderTaggedData with just the necessary grandparents/parents)

                Display all grandparents/parents/child nodes (renderTaggedData), no ability to expand / collapse grandparent/parent nodes.

        **************************************************************************************/

        return(
          <div className="search-results-set">
            {Object.keys(browseTaggedData.taggedData).length === 0 && Object.keys(renderTaggedData.taggedData).length === 0 && <p>Loading....</p>}
            {Object.keys(browseTaggedData.taggedData).length > 0 && Object.keys(renderTaggedData.taggedData).length === 0 && <p>No results found.</p>}

            {Object.keys(renderTaggedData.taggedData).length > 0 && topNavSearchTerm === '' &&
              <div>
                {this.renderTaggedDataDisplay_NoSearchTerm()}
              </div>
            }
            {Object.keys(renderTaggedData.taggedData).length > 0 && topNavSearchTerm !== '' &&
              <div>
                {this.renderTaggedDataDisplay_SearchTerm()}
              </div>
            }

            <style jsx>{`
              .search-results-set {
                  margin-left: 20px;
                  margin-top: 25px;
                  overflow-y: scroll;
                  min-height: 300px;
                  height: 300px;
                  max-height: 300px;
              }

              .search-results-grandparent {
                font-size: 1.25em;
              }

              .search-results-parent {
                font-size: 1.0em;
                margin-left: 75px;
              }

              .search-results-item {
                font-size: 1.0em;
                margin-left: 150px;
              }
              `}</style>
          </div>
        )
    }

    renderTaggedDataDisplay_SearchTerm() {
      console.log('here');
      return(
        <p>with search term...</p>
      )
    }

    renderTaggedDataDisplay_NoSearchTerm() {
      const { grandParentNodeID, parentNodeID, renderTaggedData } = this.state;

      /***************************************************************************************
      noSearchTerm Use Cases:
          grandParent=null and parent=null: show top level nodes only
          grandParent=x and parent=null: show grandParent expanded one level (show parents)
          grandParent=x and parent=y: show child nodes and links
      ***************************************************************************************/
      return (
        <div>
          {grandParentNodeID === null && parentNodeID === null && <div>
            {Object.keys(renderTaggedData.taggedData).map(function (grandParentKey) {
                return (
                  <div>
                    <h1 onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</h1>
                  </div>
                )
              }, this)
            }
            </div>
          }

          {grandParentNodeID !== null && parentNodeID === null && <div>
            {Object.keys(renderTaggedData.taggedData).map(function (grandParentKey) {
                return (
                  <div>
                    <h1 onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</h1>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && <h2 onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title}</h2>}
                          </div>
                        )
                      }, this)
                    }
                  </div>
                )
              }, this)
            }
            </div>
          }

          {grandParentNodeID !== null && parentNodeID !== null && <div>
            {Object.keys(renderTaggedData.taggedData).map(function (grandParentKey) {
                return (
                  <div>
                    <h1 onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</h1>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && <h2 onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title}</h2>}
                            {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).map(function (itemKey) {
                                return (
                                  <div className="search-results-item">
                                    {grandParentKey === grandParentNodeID && parentKey === parentNodeID && <Link onClick={(event) => { this.endSearch(); }} to={`/${renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].dataType}-details/${renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].dataId}`}>{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].title}</Link>}
                                  </div>
                                )
                              }, this)
                            }
                          </div>
                        )
                      }, this)
                    }
                  </div>
                )
              }, this)
            }
            </div>
          }


        </div>
      )
    }

    render() {
      const { browseTaggedData } = this.props;
      const { topNavSearchTerm, topNavSearchEnabled, renderTaggedData } = this.state;

      //console.log('Rendering...');
      //console.log(renderTaggedData.taggedData);

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
              <Button style={{'float': 'right', 'marginLeft': '20px', 'marginBottom': '0px'}} className="btn-primary"
                onClick={(event) => { this.endSearch(); }}>
                Close/Cancel Search
              </Button>
              <h1 className="search-results-headertext">Browse / Search Results:</h1>
              <hr/>
              {this.renderTaggedDataDisplay()}
            </div>
          }
          <style jsx>{`
            .search-site-bytags {
              position: relative;
              max-width: 400px;
              min-width: 400px;
              display: inline-block;
              margin-top: -10px;
            }

            .search-results-container {
              display: inline-block;
              min-height: 400px;
              max-height: 400px;
              height: 400px;
              border: 2px solid ${black};
              background-color: ${sloohBlue};
              color: ${white};
              z-index: 1;
              max-width: 500px;
              min-width: 500px;
              margin-left: -160px;
              position: absolute;
              margin-top: 30px;
            }

            .search-results-headertext {
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
