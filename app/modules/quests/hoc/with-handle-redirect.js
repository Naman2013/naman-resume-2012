import React from 'react';

export const withHandleRedirect = WrappedComponent => {
  class withHandleRedirect extends React.Component {
    handleRedirect = questData => {
      const { router, routeParams } = this.props;
      const { redirectQuest, redirectQuestUrl } = questData;
      const defaultRedirectUrl = `/quest-details/${routeParams.questId}`;
      if (redirectQuest) {
        router.push(redirectQuestUrl || defaultRedirectUrl);
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleRedirect={this.handleRedirect}
        />
      );
    }
  }
  withHandleRedirect.displayName = `withHandleRedirect(${getDisplayName(
    WrappedComponent
  )})`;
  return withHandleRedirect;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
