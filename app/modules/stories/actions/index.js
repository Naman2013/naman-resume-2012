import createActions from './create';
import modalActions from './modal';

export * from './actions';

export default {
  ...createActions,
  ...modalActions,
};
