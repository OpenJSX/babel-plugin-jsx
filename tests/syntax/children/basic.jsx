export var input = () => {
  function div() {
    return <span></span>
  }

  return <div></div>;
};

export var simple = () => {
  return {
    tag: 'div',
    props: null,
    children: null
  };
};

export var scoped = () => {
  return {
    tag: 'span',
    props: null,
    children: null
  };
};

export var builtins = () => {
  return {
    tag: 'div',
    props: null,
    children: null
  };
};