
const StackSize = {
  large: 'large',
  small: 'small',
  flat: 'flat',
  flat64: 'flat64'
};

const ContextBase = {

  $name: 'MainContext',
  $stacksize: StackSize.large,
  $arguments: [],
  $local: [],
  $text: '',

  get name() {
    return this.$name;
  },

  set name(val) {
    this.$name = val;
  },

  get stacksize() {
    return this.$stacksize;
  },

  set stacksize(val) {
    var size = StackSize[val];
    if (size)
      this.$stacksize = size;
  },

  get args() {
    return this.$arguments.map(function(item) {
      return item + ':word';
    }).join(',');
  },

  set args(val) {
    if (Array.isArray(val))
      this.$arguments = val;
    else if (typeof val === 'object')
      this.$arguments[0] = val;
    else
      throw new Error('invalid arguments setter with ' + val);
  },

  get local() {
    return this.$local.map(function(item) {
      return item + ':word';
    }).join(',');
  },

  set local(val) {
    if (!Array.isArray(val))
      throw new Error('invalid local setter with ' + val);
    else
      this.$local = val;
  },

  get text() {
    return this.$text;
  },

  set text(val) {
    this.$text = val || this.$text;
  },

  /*
   * generate asm codes
   */
  toString: function() {
    var ret = [
      '',
      '%push '      +this.name,
      '%stacksize ' +this.stacksize,
      '', // %arg
      '', // %local
      this.text,
      '%pop',
      ''
    ];

    if (this.args.length > 0)
      ret[3] = '%arg ' + this.args;
    if (this.local.length > 0)
      ret[4] = '%local ' + this.local;
    return ret.join('\n') + '\n';
  }

};

function createContext() {
  return Object.create(ContextBase);
}

exports.createContext = createContext;
