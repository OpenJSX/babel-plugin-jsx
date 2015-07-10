export var input = () => {
  let override = {
    string: false,
    boolean: false,
    'dashed-prop': false,
    bool_val: false,
    str_val: false,
    num_val: false
  };

  return <div
    string="string"
    boolean
    dashed-prop="dashed"
    bool_val={true}
    str_val={'string'}
    num_val={1}

    {...override}
  ></div>;
};

export var simple = () => {
  return {
    tag: 'div',
    props: {
      string: false,
      boolean: false,
      'dashed-prop': false,
      bool_val: false,
      str_val: false,
      num_val: false
    },
    children: null
  };
};