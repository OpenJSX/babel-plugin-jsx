let assert = require('assert');

let override = {
  string: false,
  boolean: false,
  'dashed-prop': false,
  bool_val: false,
  str_val: false,
  num_val: false
};

export var input = () => {
  return <div {...override} ></div>;
};

export var simple = () => {
  return assert.deepEqual(input(), {
    tag: 'div',
    props: override,
    children: null
  });
};