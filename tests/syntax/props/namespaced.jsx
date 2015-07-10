export var input = () => {
  return <div
    xml:string="string"
    xml:boolean
    xml:dashed-prop="dashed"
    xml:bool_val={true}
    xml:str_val={'string'}
    xml:num_val={1}
  ></div>;
};

export var simple = () => {
  return {
    tag: 'div',
    props: {
      'xml:string': 'string',
      'xml:boolean': true,
      'xml:dashed-prop': 'dashed',
      'xml:bool_val': true,
      'xml:str_val': 'string',
      'xml:num_val': 1
    },
    children: null
  };
};