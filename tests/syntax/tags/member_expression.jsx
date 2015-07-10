export var input = () => {
  let UI = {
    Views: {
      Custom: function CustomView() {
        return <div>CustomView</div>
      }
    }
  };

  return <UI.Views.Custom>
    <div>DIV</div>
  </UI.Views.Custom>;
};

export var simple = () => {
  return {
    tag: 'UI.Views.Custom',
    props: null,
    children: [{
      tag: 'div',
      props: null,
      children: ['DIV']
    }]
  };
};

export var scoped = () => {
  return {
    tag: 'div',
    props: null,
    children: ['CustomView']
  };
};

export var builtins = () => {
  return {
    tag: 'div',
    props: null,
    children: ['CustomView']
  };
};