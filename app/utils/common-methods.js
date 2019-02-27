export const getSelectOptions = (
  opts = [],
  valueProp = 'id',
  nameProp = 'name'
) =>
  opts.map(item => ({
    value: item[valueProp],
    label: item[nameProp],
  }));
