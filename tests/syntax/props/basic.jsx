let assert = require('assert');

export var input = () => {
  return <div
    string="string"
    boolean
    dashed-prop="dashed"
    bool_val={true}
    str_val={'string'}
    num_val={1}
  ></div>;
};

export var simple = () => {
  assert.deepEqual(input(), {
    tag: 'div',
    props: {
      string: 'string',
      boolean: true,
      'dashed-prop': 'dashed',
      bool_val: true,
      str_val: 'string',
      num_val: 1
    },
    children: null
  });
};