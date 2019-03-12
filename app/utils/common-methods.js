export const getSelectOptions = (
  opts = [],
  valueProp = 'id',
  nameProp = 'name',
  disabled = false
) =>
  opts.map(item => ({
    value: item[valueProp],
    label: item[nameProp],
    disabled: disabled && !item[disabled],
  }));
