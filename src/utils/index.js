import _ from 'lodash';
export const isNilEmpty = (value) => {
  if (_.isString(value)) {
    return value.length === 0;
  }
  if (_.isObject(value)) {
    return _.isEmpty(Object.keys(value));
  }
  if (_.isArray(value)) {
    return _.isEmpty(value.length);
  }
  return _.isNil(value);
};
