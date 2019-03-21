// @flow
export type TAccountTypeItem = {
  label: string,
  name: string | Date | number
};

export type TFormField = {
  count: number,
  name: string,
  type: string
};

export type TInitialState = {
  isFetching: boolean,
  isLoaded: boolean,
  serverError: boolean,
  accountTypeItems: Array<TAccountTypeItem>,
  accountDetailsOptions: Array<TFormField>,
  paymentDetailsOptions: Array<TFormField>
};

