/***********************************
 * V4 Common Discussions Board - Group Description
 ***********************************/

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { DeviceContext } from 'providers/DeviceProvider';
import cloneDeep from 'lodash/cloneDeep';
import TextareaField from 'app/components/form/TextareaField';
import Button from 'app/components/common/style/buttons/Button';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { CLASSROOM_SET_GROUP_DESCRIPTION_ENDPOINT_URL } from 'app/services/classroom/classroom';
import Btn from '../../../atoms/Btn'


const { any, bool, func, number, shape, string } = PropTypes;
@withTranslation()
class DiscussionBoardDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupDescription: props.description,
      inEditMode: false,
    };
  }

  static propTypes = {
    groupId: string,
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

  enableEditMode = () => {
    this.setState(() => ({
      inEditMode: true,
    }));
  };

  cancelEditMode = () => {
    /* turn off edit mode and reset the group description back to the original description */
    this.setState(() => ({
      inEditMode: false,
      groupDescription: this.props.description,
    }));

    //reset the form field back to the original description
    this.props.change('groupDescription', this.props.description);
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleGroupDescriptionFieldChange = ({ value }) => {
   
    this.setState(() => ({
      groupDescription: value,
    }));
  };

  /* Submit the Form and perform any validations as needed */
  handleSubmit = formValues => {
    const { groupId, user } = this.props;
    const { groupDescription } = this.state;

  

    formValues.preventDefault();

    const setGroupDescriptionResult = API.post(
      CLASSROOM_SET_GROUP_DESCRIPTION_ENDPOINT_URL,
      {
        cid: user.cid,
        at: user.at,
        token: user.token,
        groupId,
        groupDescription,
      }
    )
      .then(response => {
        const res = response.data;
        if (res.apiError == false) {
          //the edit was successful
          this.setState(() => ({
            inEditMode: false,
          }));
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  render() {
    const { canEdit, t,canEditGroup } = this.props;
    const { inEditMode, groupDescription } = this.state;
    
    return (
      <div className="groups-header-information">
        {!this.state.inEditMode && (
          <div className='d-inline-flex'>
          <div className='p-3' dangerouslySetInnerHTML={{ __html: groupDescription }} />
        </div>
        )}
        {canEditGroup&& (
             <Btn
             onClick={() =>
               this.setState({ inEditMode: true })
             }
             mod="circle"
           >
             <i className="fa fa-pencil" />
           </Btn>
            )}
        {this.state.inEditMode && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <Field
                name="groupDescription"
                component={TextareaField}
                value={this.state.groupDescription}
                onChange={event => {
                  this.handleGroupDescriptionFieldChange({
                    value: event.target.value,
                  });
                }}
              />

              {inEditMode && (
                <div className="button-actions">
                  <Button
                    type="button"
                    text={t('AskAnAstronomer.Cancel')}
                    onClickEvent={this.cancelEditMode}
                  />

                  <Button
                    className="submit-button"
                    type="submit"
                    onClickEvent={this.handleSubmit}
                    text={t('AskAnAstronomer.SaveChanges')}
                  />
                </div>
              )}
            </form>
          </div>
        )}
        {!inEditMode && canEdit && (
          <div className="button-actions">
            <Button
              type="button"
              text={t('AskAnAstronomer.EditDescription')}
              onClickEvent={this.enableEditMode}
            />
          </div>
        )}
        <style jsx>{`
          .button-actions {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .submit-button {
          }

          @media ${screenLarge} {
            justify-content: flex-end;

            .button-actions {
              padding-top: 30px;
            }
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ user, editGroupDescriptionForm }) => ({
  user,
  editGroupDescriptionForm,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({ form: 'editGroupDescriptionForm', enableReinitialize: true })(
    DiscussionBoardDescription
  )
);
