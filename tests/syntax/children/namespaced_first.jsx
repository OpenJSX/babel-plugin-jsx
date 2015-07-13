let assert = require('assert');

function div() {
  return <span></span>
}

export var input = () => {
  return <div>
    <span></span>
    <ns:Tag></ns:Tag>
    <Member.Tag></Member.Tag>
    <Custom></Custom>
  </div>;
};

export var simple = () => {
  return assert.deepEqual(input(), {
    tag: 'div',
    props: null,
    children: [{
      tag: 'span',
      children: null,
      props: null
    }, {
      tag: 'ns:Tag',
      children: null,
      props: null
    }, {
      tag: 'Member.Tag',
      children: null,
      props: null
    }, {
      tag: 'Custom',
      children: null,
      props: null
    }]
  });
};

export var scoped = () => {
  assert.deepEqual(input(), {
    tag: ['div', div],
    props: null,
    children: [{
      tag: 'span',
      children: null,
      props: null
    }, {
      tag: 'ns:Tag',
      children: null,
      props: null
    }, {
      tag: 'Member.Tag',
      children: null,
      props: null
    }, {
      tag: 'Custom',
      children: null,
      props: null
    }]
  });
};

export var builtins = () => {
  assert.throws(function() {
    input();
  }, /Member is not defined/);
};