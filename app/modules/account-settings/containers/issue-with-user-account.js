// @flow

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hideIssueWithUserAccountModal } from 'app/modules/authorization/actions';
import {
  makeErrorDataSelector,
  makeIssueWithUserAccountModalVisibleSelector,
} from '../../authorization/selectors';
import { IssueWithUserAccount } from '../components/issue-with-user-account';

const mapStateToProps = createStructuredSelector({
  errorData: makeErrorDataSelector(),
  isModalVisible: makeIssueWithUserAccountModalVisibleSelector(),
});

const mapDispatchToProps = {
  hideIssueWithUserAccountModal,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IssueWithUserAccount);
