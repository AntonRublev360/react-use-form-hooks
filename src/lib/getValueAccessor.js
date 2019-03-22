import get from 'lodash/get';

export default function getValueAccessor(accessor) {
  if (typeof accessor === 'string') {
    return value => get(value, accessor);
  }
  if (typeof accessor === 'function') {
    return accessor;
  }
  return defaultAccessor;
}

function defaultAccessor(value) {
  return get(value, 'target.value', value);
}
