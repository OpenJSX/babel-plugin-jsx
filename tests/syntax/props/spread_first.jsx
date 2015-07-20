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
  return <div {...override}
    string="string"
    boolean
    dashed-prop="dashed"
    bool_val={true}
    str_val={'string'}
    num_val={1}
  ></div>;
};

export var simple = () => {
  return assert.deepEqual(input(), {
    tag: 'div',
    props: [{}, override, {
      string: 'string',
      boolean: true,
      'dashed-prop': 'dashed',
      bool_val: true,
      str_val: 'string',
      num_val: 1
    }],
    children: null
  });
};