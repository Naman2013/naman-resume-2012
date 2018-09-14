import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import clone from 'lodash/clone';
import { fetchBrowseTaggedDataAction } from '../../modules/browse-tagged-data/actions';
import { shadows, astronaut, romance, gainsboro, seashell } from '../../styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

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
  state = {
    topNavSearchTerm: '',
    topNavSearchEnabled: false,
    renderTaggedData: {
      taggedData: { },
    },
    grandParentNodeID: null,
    parentNodeID: null,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (!isOpen) {
      this.doTearDown();
    }

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

  componentWillUnmount() {
    this.doTearDown();
  }

  doTearDown() {
    this.endSearch();
  }

  handleFieldChange(searchData) {
    //console.log("Search Text Changed: " + searchData.value);

    const { browseTaggedData } = this.props;

    this.setState({
      topNavSearchTerm: searchData.value,
      topNavSearchEnabled: true,
    });

    /* build an internal object structure based on the search term entered so the rendering can be done against that object instead of the complete data stream (ex: filter on Jupiter) */
    if (searchData.value.length === 0) {
      /* render the entire browse tagged data set as their is no search term limiting the results */
      //console.log(browseTaggedData);
      this.setState({
        renderTaggedData: browseTaggedData,
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

      /* build the render data set based on the search term so the search results list gets refined based on the new data feed results
        > Only show grandparents where there is an item to be found.
        > Only show parents where their is an item to be found.
        > Only show items that match the begginng of the search term.

        ****************************
        ***** IMPORTANT NOTE *******
        ****************************
        DEEP COPY....We must have a deep copy of the browseTaggedData to work with as this process is going to remove data and without a deep copy it would affect the browseTaggedData object
      */
      var tmpRenderedDataObj = _.cloneDeep(browseTaggedData);

      //step 1: delete an items that don't match
      var itemsFound = false;
      Object.keys(browseTaggedData.taggedData).map(function (grandParentKey) {
        Object.keys(browseTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
            /* reset this back to false, otherwise parent nodes in the same grandparent will appear with no item (child) nodes beneath it if there are no matching items... */
            itemsFound = false;

            Object.keys(browseTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).map(function (itemKey) {
              if (browseTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].title.toLowerCase().startsWith( searchData.value.toLowerCase() ) === false) {
                delete tmpRenderedDataObj.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey];
              }
              else {
                /* a matching item has been found that begins with the search term */
                itemsFound = true;
              }
            }, this);

            if (itemsFound === false) {
              /* remove the parent node, there are no matching items in it. */
              delete tmpRenderedDataObj.taggedData[grandParentKey].subnodes[parentKey];
            }
        }, this);

        if (Object.keys(tmpRenderedDataObj.taggedData[grandParentKey].subnodes).length === 0) {
          /* remove the grand parent node, there are no parent nodes under it */
          delete tmpRenderedDataObj.taggedData[grandParentKey];
        }
      }, this);

      //console.log(tmpRenderedDataObj);

      //update the render tagged data set to represent the newly trimmed down node tree based on the user's latest search terms.
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
      //console.log(topNavSearchEnabled);
      //console.log(this.props.browseTaggedData);

      if (topNavSearchEnabled != true) {
        this.setState({
          renderTaggedData: this.props.browseTaggedData,
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
    const { browseTaggedData } = this.props;

    //console.log(browseTaggedData);

    this.setState({
      renderTaggedData: _.cloneDeep(browseTaggedData),
      topNavSearchTerm: '',
      topNavSearchEnabled: false,
      grandParentNodeID: null,
      parentNodeID: null,
    });
  }

    /* act on changes to the grandparent node */
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

    /* act on changes to the parent node */
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
              (X) grandParent=null and parent=null: show top level nodes only
              (X) grandParent=x and parent=null: show grandParent expanded one level (show parents)
              (X) grandParent=x and parent=y: show child nodes and links

          searchTerm Use Cases:
            Scan through all child nodes at the grandparent/parent level to see if there are any child objects that
              .... begin with noSearchTerm (use browseTaggedData to build renderTaggedData with just the necessary grandparents/parents)

                Display all grandparents/parents/child nodes (renderTaggedData), no ability to expand / collapse grandparent/parent nodes.

        **************************************************************************************/

        return (
          <div className="search-results-set">
            {Object.keys(browseTaggedData.taggedData).length === 0 && Object.keys(renderTaggedData.taggedData).length === 0 && <p>Loading....</p>}
            {Object.keys(browseTaggedData.taggedData).length > 0 && Object.keys(renderTaggedData.taggedData).length === 0 && <div className="search-results-noresultsfoundtext">No results found for: {topNavSearchTerm}.</div>}

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
                  margin-left: 0px;
                  margin-top: 20px;
                  overflow-y: none;
                  min-height: 320px;
                  height: 320px;
                  max-height: 320px;

              }

              .search-results-noresultsfoundtext {
                  font-size: 20px;
              }

              .search-results-grandparent {
                font-size: 20px;
                padding: 15px 0;
                border-top: 1px solid ${shadows};
              }

              .search-results-parent {
                font-size: 15px;
                padding: 15px 0;
                margin-left: 75px;
              }

              .search-results-item {
                font-size: 12px;
                font-weight: bold;
                font-family: ${primaryFont};
                text-transform: uppercase;
                padding: 15px 0;
                margin-left: 150px;
                color: ${astronaut};
              }
              `}</style>
          </div>
        )
    }

    renderTaggedDataDisplay_SearchTerm() {
      /************************************************************************************
      Always return all available data and the grandparent / parent nodes always expanded.
      The data to display has already been trimmed to only include the grandparent/parent
          nodes that have matching items.
      ************************************************************************************/
      const { renderTaggedData } = this.state;

      return(
        <div>
          {Object.keys(renderTaggedData.taggedData).map(function (grandParentKey) {
              return (
                <div>
                  <div className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</div>
                  {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                      return (
                        <div>
                          <div className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title}</div>
                          {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).map(function (itemKey) {
                              return (
                                <div className="search-results-item">
                                  <Link onClick={(event) => { this.endSearch(); }} to={`/${renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].dataType}-details/${renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].dataId}`}>{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].title}</Link>
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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</div>
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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</div>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && <div onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title}</div>}
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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title}</div>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && <div onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title}</div>}
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
      const { browseTaggedData, isOpen } = this.props;
      const { topNavSearchTerm, topNavSearchEnabled, renderTaggedData } = this.state;

      //console.log('Rendering...');
      //console.log(renderTaggedData.taggedData);

      return (
        <div className="root">
          <span className="search-text">Search:</span>
          <input
            id="BrowseTaggedDataSearchInputField"
            onClick={(event) => { this.handleClick({ value: event.target.value}); }}
            onChange={(event) => { this.handleFieldChange({ value: event.target.value }); }}
            type="text"
            className="search-input-field"
            value={topNavSearchTerm}
          />

          {topNavSearchEnabled == true && <div className="search-results-container">
              <span className="search-text">Search Results:</span>
              {this.renderTaggedDataDisplay()}
            </div>
          }
          <style jsx>{`
            .root {
              position: relative;
              display: inline-block;
              margin: 50px 25px;
              padding-left: 25px;
              background-color: ${romance};
              height: 100%;
              width: 100%;
              margin-bottom: 200px;
            }

            .search-results-container {
              display: block;
              color: ${astronaut};
            }

            .search-results-headertext {
                margin-left: 0px;
                font-size: 1.25em;
            }

            .search-text {
                margin: 20px 0;
                color: ${astronaut};
                font-weight: bold;
                font-family: ${primaryFont};
                font-size: 12px;
                text-transform: uppercase;
            }

            .search-input-field {
              display: block;
              width: 95%;
              padding: 10px;
              margin: 25px 0;
              font-size: 30px;
              font-family: ${secondaryFont};
              font-weight: normal;
              line-height: 1.5;
              background-color: ${seashell};
              background-clip: padding-box;
              border: 1px solid ${shadows};
              border-radius: .25rem;
            }
            `}</style>
        </div>
      );
    }
}

export default BrowseTaggedDataSearch;
