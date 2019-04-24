import { createSelector } from 'reselect';

export const selectWidget = state => state.telescopeDetails;

export const makeMoonlightWidgetDataSelector = () =>
  createSelector(
    selectWidget,
    state => {
      return {
        widgetId: state.currentObservatory.MoonlightBarWidgetId,
        obsId: state.currentObservatory.obsId,
      };
    }
  );
