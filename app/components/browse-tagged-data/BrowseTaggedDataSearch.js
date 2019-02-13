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
import DisplayAtBreakpoint from '../common/DisplayAtBreakpoint';

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

  componentDidMount() {
    this.handleClick({ value: ''});
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (!isOpen) {
      this.doTearDown();
    }
    else {
       this.handleClick({ value: ''});
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
    this.setState({
      topNavSearchTerm: searchData.value,
    });
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
          renderTaggedData: _.cloneDeep(this.props.browseTaggedData),
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
        this.setState({
          parentNodeID: parentKey
        });
      }
      else {
        /* un-select the parent node */
        this.setState({
          parentNodeID: null
        });
      }
    }

    renderTaggedDataDisplay() {
        const { topNavSearchTerm, topNavSearchEnabled, renderTaggedData } = this.state;
        const { browseTaggedData } = this.props;

        /**************************************************************************************
        Use cases:
          Use Cases:
              (X) grandParent=null and parent=null: show top level nodes only
              (X) grandParent=x and parent=null: show grandParent expanded one level (show parents)
              (X) grandParent=x and parent=y: show child nodes and links
        **************************************************************************************/

        return (
          <div className="search-results-set">
            {Object.keys(browseTaggedData.taggedData).length === 0 && Object.keys(renderTaggedData.taggedData).length === 0 && <p>Loading....</p>}
            {Object.keys(renderTaggedData.taggedData).length > 0 &&
              <div key="search-results-no-searchterm">
                {this.renderTaggedDataDisplay_BrowseList()}
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
                font-size: 18px;
                padding: 15px 0;
                margin-left: 75px;
                font-family: ${primaryFont};
                color: ${astronaut};

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

    renderTaggedDataDisplay_BrowseList() {

      const { grandParentNodeID, parentNodeID, renderTaggedData } = this.state;

      //console.log(grandParentNodeID);
      //console.log(parentNodeID);

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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).length})<Link to={renderTaggedData.taggedData[grandParentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>
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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).length})<Link to={renderTaggedData.taggedData[grandParentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length === 0 && <div className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length})<Link to={renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>}
                            {grandParentKey === grandParentNodeID && Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length > 0 && <div onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length}) <Link to={renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>}
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
                    <div onClick={(event) => { this.changeGrandParentNodeID(grandParentKey) }} className="search-results-grandparent">{renderTaggedData.taggedData[grandParentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).length})<Link to={renderTaggedData.taggedData[grandParentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>
                    {Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).map(function (parentKey) {
                        return (
                          <div>
                            {grandParentKey === grandParentNodeID && Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length == 0 && <div className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes).length}) <Link to={renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>}
                            {grandParentKey === grandParentNodeID && Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length > 0 && <div onClick={(event) => { this.changeParentNodeID(parentKey) }} className="search-results-parent">{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].title} ({Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).length}) <Link to={renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>}
                            {grandParentKey === grandParentNodeID && parentKey === parentNodeID && Object.keys(renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes).map(function (itemKey) {
                                return (
                                  <div className="search-results-item">
                                    <div>{renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].title}<Link to={renderTaggedData.taggedData[grandParentKey].subnodes[parentKey].subnodes[itemKey].linkUrl}><img style={{paddingLeft: '15px'}} src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"/></Link></div>
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
          {topNavSearchEnabled == true && <div className="search-results-container">
            <div style={{display: 'block'}}>
              {this.renderTaggedDataDisplay()}
            </div>
          </div>
          }
          <hr/>
          <div style={{paddingTop: '25px', display: 'block'}}>
            <div className="search-text">Didn't find what your were looking for?</div>
            <div>
              <input
                id="BrowseTaggedDataSearchInputField"
                onChange={(event) => { this.handleFieldChange({ value: event.target.value }); }}
                type="text"
                className="search-input-field"
                value={topNavSearchTerm}
              />
              <div className="browse-outer-container"><Button className="browse-find-button">Find</Button></div>
            </div>
          </div>

          <style jsx>{`
            .browse-outer-container {
              display: inline-block;
              padding-left: 20px;
              position: absolute;
              padding-top: 5px;
            }

            .browse-find-button {
              font-weight: bold;
            }

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
              display: inline-block;
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
                font-size: 18px;
                text-transform: uppercase;
            }

            .search-input-field {
              display: inline-block;
              width: 60%;
              max-width: 300px;
              margin-left: 25px
              margin-right: 25px;
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
