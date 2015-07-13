let assert = require('assert');

function div() {
  return <span></span>
}

export var input = () => {
  return <div></div>;
};

export var simple = () => {
  assert.deepEqual(input(), {
    tag: 'div',
    props: null,
    children: null
  });
};

export var scoped = () => {
  assert.deepEqual(input(), {
    tag: ['div', div],
    props: null,
    children: null
  });
};

export var builtins = () => {
  assert.deepEqual(input(), {
    tag: 'div',
    props: null,
    children: null
  });
};