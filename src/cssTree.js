/**
 * Author   : unadlib
 * Date     : 2017/7/19
 * Time     : 上午12:30
 * Project [ react-native-css-tree ] Coded on WebStorm.
 */

const prefix = '$'
const inheritRegular = new RegExp('^_')
const variableRegular = new RegExp(`\\${prefix}`, 'g')

const isPlainObject = (arg) => toString.call(arg) === '[object Object]'
const isFunction = (arg) => toString.call(arg) === '[object Function]'
const isPure = (arg) => !(isPlainObject(arg) || isFunction(arg))

/**
 * replace String.
 * @param str
 * @param quote
 */
const replace = (str, quote) => {
  const regs = new RegExp(`(${quote}\\s*\\$[^${quote}]+\\s*${quote})`, 'g')
  const reg = new RegExp(quote, 'g')
  return str.replace(regs, i => i.replace(reg, ''))
}

/**
 * Transform string template.
 * @param args
 * @param variable
 * @returns {*}
 */
const transform = (args, variable) => {
  const fn = new Function(
    ...Object.keys(args).map(i => prefix + i),
    `return ${variable}`,
  )
  return fn(...Object.keys(args).map(i => args[i]))
}

/**
 * Filtering objects above the JSON two layer
 * @param style
 * @returns {{}}
 */
function css(style = {}) {
  const $style = {}
  Object.keys(style).map(name => {
    if (isPure(style[name])) {
      $style[name] = style[name]
    }
    return name
  })
  return $style
}

/**
 * separate Style.
 * @param style
 * @param name
 * @param value
 * @returns {[null,null]}
 */
const separate = (style, [name, value]) => {
  const $style = style
  const key = !isPure(value) ? 'proto' : 'root'
  $style[key][name] = value
}

/**
 * Separate the CSS JSON.
 * @param style
 * @returns {{proto: {}, root: {}}}
 */
const separateJSON = (style = {}) => {
  const $style = {
    proto: {},
    root: {},
  }
  Object.entries(style).map(separate.bind(this, $style))
  return $style
}

/**
 * Create the CSS tree prototype.
 * @param root
 * @param proto
 * @returns {CssTree}
 */
const getCssTree = ({root = {}, proto = {}} = {}) => {
  function CssTree() {
    Object.assign(this, root)
  }

  function getPrototype(cssTree, i) {
    const {prototype} = cssTree
    if (isPlainObject(proto[i])) {
      prototype[i] = getCssTree(separateJSON(proto[i]))
    } else {
      prototype[i] = proto[i]
    }
  }

  Object.keys(proto).map(getPrototype.bind(this, CssTree))
  return new CssTree()
}

/**
 * parse Style.
 * @param originalStyle
 * @param init
 * @param processes
 * @param variables
 */
const parseStyle = (originalStyle = {}, init = {}, processes = [], variables = {}) => {
  const style = originalStyle
  Object.keys(style).map(i => {
    const clone = JSON.parse(JSON.stringify(css(style[i])))
    if (isPlainObject(style[i])) {
      let newStyle = inheritRegular.test(i)
        ? Object.assign(style[i], css(style), clone)
        : style[i]
      const parentStyle = {...variables, ...css(style)}
      processes.map(fn => {
        newStyle = fn(i, parentStyle, newStyle)
        return fn
      })
      parseStyle(newStyle, init, processes, parentStyle)
    } else if (isFunction(style[i])) {
      let fn = replace(style[i].toString(), '\'')
      fn = replace(fn, '"')
      const args = Object.assign({}, variables, css(style))
      style[i] = transform(args, fn)
    } else if (variableRegular.test(style[i])) {
      const fnString = `return ${style[i].replace(
        variableRegular,
        `${prefix}.`,
      )}`
      style[i] = new Function(prefix, fnString)(variables)
    }
    return i
  })
}


/**
 * getTree
 * @param styles
 * @param init
 * @param processes
 * @returns {CssTree}
 */
const getTree = (styles = {}, init = {}, processes = []) => {
  const $styles = {}
  const func = i => {
    let root = styles[i]
    const setRoot = fn => {
      root = fn(i, init, root)
    }
    processes.map(setRoot)
    parseStyle(root, init, processes, init)
    $styles[i] = root
  }
  Object.keys(styles).map(func)
  return getCssTree(separateJSON($styles))
}

export default (init = {}) => (...processes) => styles =>
  getTree(styles, init, processes)
