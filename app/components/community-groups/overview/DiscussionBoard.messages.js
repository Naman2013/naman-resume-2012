import { defineMessages } from 'react-intl';
import { type Messages } from '../../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  LoadingStudentsList: {
    id: 'Clubs.LoadingStudentsList',
    defaultMessage: 'Loading Google Classroom Students',
    description: 'Clubs Loading Google Classroom Students',
  },
  RefreshingStudentsList: {
    id: 'Clubs.RefreshingStudentsList',
    defaultMessage: 'Refreshing Google Classroom Students List',
    description: 'Clubs Refreshing Google Classroom Students List',
  },
  Pending: {
    id: 'Clubs.Pending',
    defaultMessage: 'Pending',
    description: 'Clubs Pending status',
  },
  Active: {
    id: 'Clubs.Active',
    defaultMessage: 'Active',
    description: 'Clubs Active status',
  },
  NoStudents: {
    id: 'Clubs.NoStudents',
    defaultMessage:
      'There are no students in this Google Classroom, please update your Google Classroom first.',
    description: 'Clubs no students message',
  },
  AddStudentNote: {
    id: 'Clubs.AddStudentNote',
    defaultMessage:
      'Please note, clicking "Add Student" will add this student to your club and consume one of your available licenses.',
    description: 'Clubs add student note',
  },
  LoadingClubInvitations: {
    id: 'Clubs.LoadingClubInvitations',
    defaultMessage: 'Loading Club Invitations',
    description: 'Loading Club Invitations',
  },
  NoInvitations: {
    id: 'Clubs.NoInvitations',
    defaultMessage: 'There are no invitations',
    description: 'Clubs no invitations messages',
  },
  Cancel: {
    id: 'Clubs.Cancel',
    defaultMessage: 'Cancel',
    description: 'Clubs Cancel button',
  },
  FirstName: {
    id: 'Clubs.FirstName',
    defaultMessage: 'Please provide a First Name',
    description: 'Clubs First Name placeholder',
  },
  LastName: {
    id: 'Clubs.LastName',
    defaultMessage: 'Please provide a Last Name',
    description: 'Clubs Last Name placeholder',
  },
  EmailAddress: {
    id: 'Clubs.EmailAddress',
    defaultMessage: 'Please provide an Email Address',
    description: 'Clubs Email Address placeholder',
  },
  ConfirmEmailAddress: {
    id: 'Clubs.ConfirmEmailAddress',
    defaultMessage: 'Please confirm the Email Address',
    description: 'Clubs confirm Email Address placeholder',
  },
  EmailsDontMatch: {
    id: 'Clubs.EmailsDontMatch',
    defaultMessage: 'The Email Address and the Email Verification fields must match.',
    description: 'Clubs email not match message',
  },
  SendInvitation: {
    id: 'Clubs.SendInvitation',
    defaultMessage: 'Send Invitation',
    description: 'Clubs Send Invitation button',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
