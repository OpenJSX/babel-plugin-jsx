let assert = require('assert');

let UI = {
  Views: {
    Custom: function CustomView() {
      return <div>CustomView</div>
    }
  }
};

export var input = () => {
  return <UI.Views.Custom>
    <div>DIV</div>
  </UI.Views.Custom>;
};

export var simple = () => {
  assert.deepEqual(input(), {
    tag: 'UI.Views.Custom',
    props: null,
    children: [{
      tag: 'div',
      props: null,
      children: ['DIV']
    }]
  });
};

export var scoped = () => {
  assert.deepEqual(input(), {
    tag: ['UI.Views.Custom', UI.Views.Custom],
    props: null,
    children: [{
      tag: 'div',
      children: ['DIV'],
      props: null
    }]
  });
};

export var builtins = () => {
  assert.deepEqual(input(), {
    tag: ['UI.Views.Custom', UI.Views.Custom],
    props: null,
    children: [{
      tag: 'div',
      children: ['DIV'],
      props: null
    }]
  });
};