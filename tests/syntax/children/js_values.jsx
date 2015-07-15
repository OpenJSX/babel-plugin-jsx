let assert = require('assert');

function div() {
  return <span></span>
}

let fnVal = () => {};

export var input = () => {
  return <div>
    { true }
    { 1 }
    { 'string' }
    { { key: 'value' } }
    { [1, 2, 3] }
    { fnVal }
  </div>;
};

export var simple = () => {
  return assert.deepEqual(input(), {
    tag: 'div',
    props: null,
    children: [
      true,
      1,
      'string',
      { key: 'value' },
      [1, 2, 3],
      fnVal
    ]
  });
};