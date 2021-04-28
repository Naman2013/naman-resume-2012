import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import clone from 'lodash/clone';
import noop from 'lodash/noop';
import { fetchBrowseTaggedDataAction } from '../../modules/browse-tagged-data/actions';
import {
  fetchBrowseFindDataAction,
  resetBrowseFindDataAction,
} from '../../modules/browse-find-data/actions';
import {
  shadows,
  astronaut,
  romance,
  gainsboro,
  seashell,
} from '../../styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import DisplayAtBreakpoint from '../common/DisplayAtBreakpoint';
import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';
import Request from 'app/components/common/network/Request';

const { func } = PropTypes;

const mapStateToProps = ({
  browseTaggedData,
  browseFindData,
  renderTaggedData,
  findTermForm,
}) => ({
  browseTaggedData,
  browseFindData,
  renderTaggedData,
  findTermForm,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchBrowseTaggedDataAction,
      fetchBrowseFindDataAction,
      resetBrowseFindDataAction,
    },
    dispatch
  ),
});

class BrowseTaggedDataSearch extends Component {
  state = {
    topNavFindTerm: '',
    browseTaggedDataEnabled: false,
    renderTaggedData: {
      taggedData: {},
    },
    grandParentNodeID: null,
    parentNodeID: null,
  };

  static propTypes = {
    change: func,
  };

  static defaultProps = {
    change: noop,
  };

  componentDidMount() {
    this.handleClick({ value: '' });
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (!isOpen) {
      //this.doTearDown();
    } else {
      document.getElementById('BrowseTaggedDataSearchInputField').focus();
      this.handleClick({ value: '' });
    }

    /* do a deep comparision on the next data coming in to see if it's different. */
    var equal = require('deep-equal');
    if (
      equal(this.props.browseTaggedData, nextProps.browseTaggedData) == false
    ) {
      

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
    this.endBrowse();
    this.endFind();
  }

  handleFieldChange(searchData) {
    this.setState({
      topNavFindTerm: searchData.value,
    });
  }

  handleClick(searchData) {
   

    const { browseTaggedDataEnabled } = this.state;
    /* only fetch the browse tagged data if the search has not already been iniated,
        this will prevent multiple data calls when a user clicks in the text box when the results are already active. */
   

    if (browseTaggedDataEnabled != true) {
      this.setState({
        renderTaggedData: _.cloneDeep(this.props.browseTaggedData),
        topNavFindTerm: searchData.value,
        browseTaggedDataEnabled: true,
        grandParentNodeID: null,
        parentNodeID: null,
      });

      /* fetch the browse tagged data */
      const viewType = "globalFind";
      this.props.actions.fetchBrowseTaggedDataAction(viewType);
    }
  }

  endFind() {
    this.setState({
      topNavFindTerm: '',
    });

    //reset the redux form field back to empty
    this.props.change('findTerm', '');

    this.props.actions.resetBrowseFindDataAction();
  }

  endBrowse() {
    const { browseTaggedData } = this.props;

    this.setState({
      renderTaggedData: _.cloneDeep(browseTaggedData),
      browseTaggedDataEnabled: false,
      grandParentNodeID: null,
      parentNodeID: null,
    });
  }

  performFind(event) {
    event.preventDefault();

    const { topNavFindTerm } = this.state;
    const viewType = "globalFind";

    //fetch find data
    this.props.actions.fetchBrowseFindDataAction(topNavFindTerm, viewType);
  }

  /* act on changes to the grandparent node */
  changeGrandParentNodeID(grandParentKey) {
    const { grandParentNodeID } = this.state;

    /* detect changes in the grand parent key */
    if (grandParentNodeID === null || grandParentNodeID != grandParentKey) {
      /* select the grand parent node */
      this.setState({ grandParentNodeID: grandParentKey, parentNodeID: null });
    } else {
      /* un-select the grand parent node */
      this.setState({ grandParentNodeID: null, parentNodeID: null });
    }
  }

  /* act on changes to the parent node */
  changeParentNodeID(parentKey) {
    const { parentNodeID } = this.state;

    if (parentNodeID === null || parentNodeID != parentKey) {
      /* select the parent node */
      this.setState({
        parentNodeID: parentKey,
      });
    } else {
      /* un-select the parent node */
      this.setState({
        parentNodeID: null,
      });
    }
  }

  renderTaggedDataDisplay() {
    const {
      topNavFindTerm,
      browseTaggedDataEnabled,
      renderTaggedData,
    } = this.state;
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
        {Object.keys(browseTaggedData.taggedData).length === 0 &&
          Object.keys(renderTaggedData.taggedData).length === 0 && (
            <p>Loading....</p>
          )}
        {Object.keys(renderTaggedData.taggedData).length > 0 && (
          <div key="search-results-no-searchterm">
            {this.renderTaggedDataDisplay_BrowseList()}
          </div>
        )}

        <style jsx>{`
          .search-results-set {
            margin-left: 0px;
            margin-top: 20px;
            overflow-y: none;
            min-height: 320px;
            height: 320px;
            max-height: 320px;
          }
        `}</style>
      </div>
    );
  }

  renderExpandIcon(nodeId, key) {
    return (
      <span className="search-results-expand-button">
        <style jsx>{`
          .search-results-expand-button {
            cursor: pointer;
            margin-right: 10px;
            font-size: 14px;
          }
        `}</style>
        <span className={nodeId === key ? 'icon-minus' : 'icon-plus'} />
      </span>
    );
  }

  renderTaggedDataDisplay_BrowseList() {
    const { grandParentNodeID, parentNodeID, renderTaggedData } = this.state;

    

    /***************************************************************************************
      noSearchTerm Use Cases:
          grandParent=null and parent=null: show top level nodes only
          grandParent=x and parent=null: show grandParent expanded one level (show parents)
          grandParent=x and parent=y: show child nodes and links
      ***************************************************************************************/
    return (
      <div>
        <style jsx>{`
          .search-results-grandparent {
            font-size: 20px;
            padding: 15px 0;
            border-top: 1px solid ${shadows};
          }

          .search-results-parent {
            font-size: 18px;
            padding: 15px 0;
            margin-left: 35px;
            font-family: ${primaryFont};
            color: ${astronaut};
          }

          .search-results-item {
            font-size: 12px;
            font-weight: bold;
            font-family: ${primaryFont};
            text-transform: uppercase;
            padding: 15px 0;
            margin-left: 100px;
            color: ${astronaut};
          }

          .search-results-link {
            color: #415671;
          }

          .ml-24 {
            margin-left: 23.9px;
          }
        `}</style>

        {grandParentNodeID === null && parentNodeID === null && (
          <div>
            {Object.keys(renderTaggedData.taggedData).map(function(
              grandParentKey
            ) {
              const countSubItems = Object.keys(
                renderTaggedData.taggedData[grandParentKey].subnodes
              ).length;
              const additionalClass = countSubItems === 0 ? ' ml-24' : '';
              return (
                <div>
                  <div
                    onClick={event => {
                      this.changeGrandParentNodeID(grandParentKey);
                    }}
                    className="search-results-grandparent"
                  >
                    {countSubItems
                      ? this.renderExpandIcon(grandParentNodeID, grandParentKey)
                      : null}
                    <Link
                      to={renderTaggedData.taggedData[grandParentKey].linkUrl}
                    >
                      <span className={"search-results-link" + additionalClass}>
                        {renderTaggedData.taggedData[grandParentKey].title} {countSubItems
                          ? `(${
                              Object.keys(
                                renderTaggedData.taggedData[grandParentKey].subnodes
                              ).length
                            })`
                          : null}
                      </span>
                      <img
                        style={{ paddingLeft: '15px' }}
                        src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                      />
                    </Link>
                  </div>
                </div>
              );
            },
            this)}
          </div>
        )}

        {grandParentNodeID !== null && parentNodeID === null && (
          <div>
            {Object.keys(renderTaggedData.taggedData).map(function(
              grandParentKey
            ) {
              return (
                <div>
                  <div
                    onClick={event => {
                      this.changeGrandParentNodeID(grandParentKey);
                    }}
                    className="search-results-grandparent"
                  >
                    {Object.keys(
                      renderTaggedData.taggedData[grandParentKey].subnodes
                    ).length
                      ? this.renderExpandIcon(grandParentNodeID, grandParentKey)
                      : null}
                    <Link
                      to={renderTaggedData.taggedData[grandParentKey].linkUrl}
                    >
                      <span className="search-results-link">
                        {renderTaggedData.taggedData[grandParentKey].title} (
                        {
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey].subnodes
                          ).length
                        }
                        )
                      </span>
                      <img
                        style={{ paddingLeft: '15px' }}
                        src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                      />
                    </Link>
                  </div>
                  {Object.keys(
                    renderTaggedData.taggedData[grandParentKey].subnodes
                  ).map(function(parentKey) {
                    const countSubItems = Object.keys(
                      renderTaggedData.taggedData[grandParentKey].subnodes[
                        parentKey
                      ].subnodes
                    ).length;
                    const additionalClass = countSubItems === 0 ? ' ml-24' : '';
                    return (
                      <div>
                        {grandParentKey === grandParentNodeID &&
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey]
                              .subnodes[parentKey].subnodes
                          ).length === 0 && (
                            <div className="search-results-parent">
                              {Object.keys(
                                renderTaggedData.taggedData[grandParentKey]
                                  .subnodes[parentKey].subnodes
                              ).length
                                ? this.renderExpandIcon(parentNodeID, parentKey)
                                : null}
                              <Link
                                to={
                                  renderTaggedData.taggedData[grandParentKey]
                                    .subnodes[parentKey].linkUrl
                                }
                              >
                                <span className={"search-results-link" + additionalClass}>
                                  {
                                    renderTaggedData.taggedData[grandParentKey]
                                      .subnodes[parentKey].title
                                  }
                                </span>
                                <img
                                  style={{ paddingLeft: '15px' }}
                                  src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                                />
                              </Link>
                            </div>
                          )}
                        {grandParentKey === grandParentNodeID &&
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey]
                              .subnodes[parentKey].subnodes
                          ).length > 0 && (
                            <div
                              onClick={event => {
                                this.changeParentNodeID(parentKey);
                              }}
                              className="search-results-parent"
                            >
                              {Object.keys(
                                renderTaggedData.taggedData[grandParentKey]
                                  .subnodes[parentKey].subnodes
                              ).length
                                ? this.renderExpandIcon(parentNodeID, parentKey)
                                : null}
                              <Link
                                to={
                                  renderTaggedData.taggedData[grandParentKey]
                                    .subnodes[parentKey].linkUrl
                                }
                              >
                                <span className="search-results-link">
                                  {
                                    renderTaggedData.taggedData[grandParentKey]
                                      .subnodes[parentKey].title
                                  }{' '}
                                  (
                                  {
                                    Object.keys(
                                      renderTaggedData.taggedData[
                                        grandParentKey
                                      ].subnodes[parentKey].subnodes
                                    ).length
                                  }
                                  ){' '}
                                </span>
                                <img
                                  style={{ paddingLeft: '15px' }}
                                  src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                                />
                              </Link>
                            </div>
                          )}
                      </div>
                    );
                  }, this)}
                </div>
              );
            },
            this)}
          </div>
        )}

        {grandParentNodeID !== null && parentNodeID !== null && (
          <div>
            {Object.keys(renderTaggedData.taggedData).map(function(
              grandParentKey
            ) {
              return (
                <div>
                  <div
                    onClick={event => {
                      this.changeGrandParentNodeID(grandParentKey);
                    }}
                    className="search-results-grandparent"
                  >
                    {Object.keys(
                      renderTaggedData.taggedData[grandParentKey].subnodes
                    ).length
                      ? this.renderExpandIcon(grandParentNodeID, grandParentKey)
                      : null}
                    <Link
                      to={renderTaggedData.taggedData[grandParentKey].linkUrl}
                    >
                      <span className="search-results-link">
                        {renderTaggedData.taggedData[grandParentKey].title} (
                        {
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey].subnodes
                          ).length
                        }
                        )
                      </span>
                      <img
                        style={{ paddingLeft: '15px' }}
                        src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                      />
                    </Link>
                  </div>
                  {Object.keys(
                    renderTaggedData.taggedData[grandParentKey].subnodes
                  ).map(function(parentKey) {
                    const countSubItems = Object.keys(
                      renderTaggedData.taggedData[grandParentKey].subnodes[
                        parentKey
                      ].subnodes
                    ).length;
                    const additionalClass = countSubItems === 0 ? ' ml-24' : '';
                    return (
                      <div>
                        {grandParentKey === grandParentNodeID &&
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey]
                              .subnodes[parentKey].subnodes
                          ).length == 0 && (
                            <div className="search-results-parent">
                              {Object.keys(
                                renderTaggedData.taggedData[grandParentKey]
                                  .subnodes[parentKey].subnodes
                              ).length
                                ? this.renderExpandIcon(parentNodeID, parentKey)
                                : null}
                              <Link
                                to={
                                  renderTaggedData.taggedData[grandParentKey]
                                    .subnodes[parentKey].linkUrl
                                }
                              >
                                <span className={"search-results-link" + additionalClass}>
                                  {
                                    renderTaggedData.taggedData[grandParentKey]
                                      .subnodes[parentKey].title
                                  }
                                </span>
                                <img
                                  style={{ paddingLeft: '15px' }}
                                  src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                                />
                              </Link>
                            </div>
                          )}
                        {grandParentKey === grandParentNodeID &&
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey]
                              .subnodes[parentKey].subnodes
                          ).length > 0 && (
                            <div
                              onClick={event => {
                                this.changeParentNodeID(parentKey);
                              }}
                              className="search-results-parent"
                            >
                              {Object.keys(
                                renderTaggedData.taggedData[grandParentKey]
                                  .subnodes[parentKey].subnodes
                              ).length
                                ? this.renderExpandIcon(parentNodeID, parentKey)
                                : null}
                              <Link
                                to={
                                  renderTaggedData.taggedData[grandParentKey]
                                    .subnodes[parentKey].linkUrl
                                }
                              >
                                <span className="search-results-link">
                                  {
                                    renderTaggedData.taggedData[grandParentKey]
                                      .subnodes[parentKey].title
                                  }{' '}
                                  (
                                  {
                                    Object.keys(
                                      renderTaggedData.taggedData[
                                        grandParentKey
                                      ].subnodes[parentKey].subnodes
                                    ).length
                                  }
                                  ){' '}
                                </span>
                                <img
                                  style={{ paddingLeft: '15px' }}
                                  src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                                />
                              </Link>
                            </div>
                          )}
                        {grandParentKey === grandParentNodeID &&
                          parentKey === parentNodeID &&
                          Object.keys(
                            renderTaggedData.taggedData[grandParentKey]
                              .subnodes[parentKey].subnodes
                          ).map(function(itemKey) {
                            return (
                              <div className="search-results-item">
                                <div>
                                  <Link
                                    to={
                                      renderTaggedData.taggedData[
                                        grandParentKey
                                      ].subnodes[parentKey].subnodes[itemKey]
                                        .linkUrl
                                    }
                                  >
                                    <span className="search-results-link">
                                      {
                                        renderTaggedData.taggedData[
                                          grandParentKey
                                        ].subnodes[parentKey].subnodes[itemKey]
                                          .title
                                      }
                                    </span>
                                    <img
                                      style={{ paddingLeft: '15px' }}
                                      src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                                    />
                                  </Link>
                                </div>
                              </div>
                            );
                          }, this)}
                      </div>
                    );
                  }, this)}
                </div>
              );
            },
            this)}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { browseTaggedData, browseFindData, isOpen } = this.props;
    const { browseTaggedDataEnabled, renderTaggedData } = this.state;

   

    return (
      <div className="root">
        <div style={{ display: 'inline-block' }}>
          <div style={{ display: 'block' }}>
            <form
              onSubmit={event => {
                this.performFind(event);
              }}
            >
              <Field
                id="BrowseTaggedDataSearchInputField"
                name="findTerm"
                type="name"
                label={browseTaggedData.findInstructionalText}
                component={InputField}
                onChange={event => {
                  this.handleFieldChange({ value: event.target.value });
                }}
                value={this.state.topNavFindTerm}
              />
              <div className="browse-outer-container">
                <Button
                  onClick={event => {
                    this.performFind(event);
                  }}
                  className="browse-find-button"
                >
                  Find
                </Button>
                <Button
                  style={{ marginLeft: '25px' }}
                  onClick={event => {
                    this.endFind(event);
                  }}
                  className="browse-find-button"
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </div>
        <hr />

        {browseFindData.findMessage != '' && (
          <div>
            <div
              style={{ fontSize: '1.5rem', paddingBottom: '10px' }}
              dangerouslySetInnerHTML={{ __html: browseFindData.findMessage }}
            />
            {browseFindData.findData.map((foundItem, index) => (
              <p
                style={{ paddingLeft: '35px', lineHeight: '2.5em' }}
                className="search-results-item"
              >
                {foundItem.title}
                <Link to={foundItem.linkUrl}>
                  <img
                    style={{ paddingLeft: '15px' }}
                    src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                  />
                </Link>
              </p>
            ))}
            <hr />
          </div>
        )}

        {browseTaggedDataEnabled == true && (
          <div className="search-results-container">
            <div style={{ display: 'block' }}>
              {this.renderTaggedDataDisplay()}
            </div>
          </div>
        )}

        <style jsx>{`
            .browse-outer-container {
              display: inline-block;
              padding-left: 20px;
            }

            .search-results-item {
                font-size: 12px;
                font-weight: bold;
                font-family: ${primaryFont};
                text-transform: uppercase;
                padding: 15px 0;
                color: ${astronaut};
              }

            .browse-find-button {
              font-weight: bold;
            }

            .root {
              position: relative;
              display: inline-block;
              margin: 50px 0px;
              padding-left: 0px;
              background-color: ${romance};
              height: 100%;
              width: 100%;
              margin-bottom: 200px;
              padding-left: 25px;
              padding-right: 25px;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'findTermForm', enableReinitialize: true })(
    BrowseTaggedDataSearch
  )
);
