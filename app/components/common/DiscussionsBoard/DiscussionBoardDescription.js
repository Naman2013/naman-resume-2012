/***********************************
* V4 Common Discussions Board - Group Description
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DeviceContext } from 'providers/DeviceProvider';
import cloneDeep from 'lodash/cloneDeep';
import InputField from 'components/form/InputField';
import Button from 'components/common/style/buttons/Button';
import { CLASSROOM_SET_GROUP_DESCRIPTION_ENDPOINT_URL } from 'services/classroom/classroom';

const {
  any,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class DiscussionBoardDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupDescription: '',
      inEditMode: false,
    }
  }

  static propTypes = {
    groupId: number,
    description: string,
    canEdit: bool,
  };

  static defaultProps = {
    groupId: null,
    description: null,
    canEdit: false,
  };

  componentWillReceiveProps(nextProps) {
    //update the form field with the new description
    this.props.change('groupDescription', nextProps.description);

    this.setState(() => ({
      groupDescription: nextProps.description,
    }));
  }

  enableEditMode() {
    this.setState(() => ({
      inEditMode: true,
    }));
  }

  cancelEditMode() {
    /* turn off edit mode and reset the group description back to the original description */
    this.setState(() => ({
      inEditMode: false,
      groupDescription: this.props.description,
    }));

    //reset the form field back to the original description
    this.props.change('groupDescription', this.props.description);
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleGroupDescriptionFieldChange = ({ value }) => {
    this.setState(() => ({
      groupDescription: value,
    }));
  }

  /* Submit the Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    const { groupId, user } = this.props;
    const { groupDescription } = this.state;

    formValues.preventDefault();

    const setGroupDescriptionResult = axios.post(CLASSROOM_SET_GROUP_DESCRIPTION_ENDPOINT_URL, {
      cid: user.cid,
      at: user.at,
      token: user.token,
      groupId: groupId,
      groupDescription: groupDescription,
    })
      .then((response) => {
        const res = response.data;
        if (res.apiError == false) {
          //the edit was successful
          this.setState(() => ({
            inEditMode: false,
          }));
        }
      })
      .catch((err) => {
        throw ('Error: ', err);
      });
  }

  render() {
    const {
      canEdit,
    } = this.props;

    const {
      inEditMode,
      groupDescription,
    } = this.state;

    return (
      <div className="groups-header-information">
        {!this.state.inEditMode && <span dangerouslySetInnerHTML={{ __html:   groupDescription }}/>}
        {this.state.inEditMode && <div>
          <form onSubmit={this.handleSubmit}>
            <Field
              name="groupDescription"
              component={InputField}
              value={this.state.groupDescription}
              onChange={(event) => { this.handleGroupDescriptionFieldChange({ value: event.target.value }); }}
            />

            {inEditMode && canEdit && <span style={{'paddingLeft': '10px'}}>
              <br/>
              <Button
                type="button"
                text="Cancel"
                onClickEvent={() => { this.cancelEditMode(); }}/>

              <button
                className="submit-button"
                type="submit"
                >Save Changes
              </button>
              </span>}

          </form>
        </div>
        }
        {!inEditMode && canEdit && <span style={{'paddingLeft': '10px'}}>
          <br/>
          <Button
            type="button"
            text="Edit"
            onClickEvent={() => { this.enableEditMode(); }}
            />
        </span>}
      </div>
    );
  }
}


const mapStateToProps = ({ user, editGroupDescriptionForm }) => ({
  user,
  editGroupDescriptionForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'editGroupDescriptionForm', enableReinitialize: true, })(DiscussionBoardDescription));
