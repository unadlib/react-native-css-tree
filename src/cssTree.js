/**
 * Author   : unadlib
 * Date     : 2017/7/19
 * Time     : 上午12:30
 * Project [ react-native-css-tree ] Coded on WebStorm.
 */

const prefix = "$";
const inheritRegular = new RegExp("^\_");
const variableRegular = new RegExp(`\\${prefix}`, "g");

export default function createCSS(init = {}) {
    return function (...processes) {
        return function (styles) {
            return getTree(styles, init, processes);
        };
    }
}

function isPlainObject(arg) {
    return toString.call(arg) === "[object Object]";
}

function isFunction(arg) {
    return toString.call(arg) === "[object Function]";
}

function isPure(arg) {
    return !(isPlainObject(arg) || isFunction(arg));
}

function parseStyle(style = {}, init = {}, processes = [], variables = {}) {
    Object.keys(style).map(i => {
        let clone = JSON.parse(JSON.stringify(css(style[i])));
        if (isPlainObject(style[i])) {
            let newStyle = inheritRegular.test(i) ? Object.assign(style[i], css(style), clone) : style[i];
            let parentStyle = {...variables, ...css(style)};
            processes.map(fn => {
                newStyle = fn(i, parentStyle, newStyle);
            });
            parseStyle(newStyle, init, processes, parentStyle);
        } else if (isFunction(style[i])) {
            let fn = replace(style[i].toString(), "'");
            fn = replace(fn, '"');
            let args = Object.assign({}, variables, css(style));
            style[i] = transform(args, fn);
        } else {
            if (variableRegular.test(style[i])) {
                let fnString = `return ${style[i].replace(variableRegular, prefix + '.')}`;
                style[i] = new Function(prefix, fnString)(variables);
            }
        }
    });
}

function replace(str, quote) {
    let regs = new RegExp(`(${quote}\\s*\\$[^${quote}]+\\s*${quote})`, "g");
    let reg = new RegExp(quote, "g");
    return str.replace(regs, (i) => i.replace(reg, ''));
}

function transform(args, variable) {
    let fn = new Function(...Object.keys(args).map(i => prefix + i), `return ${variable}`);
    return fn(...Object.keys(args).map(i => args[i]));
}


function getTree(styles = {}, init = {}, processes = []) {
    let $styles = {};
    Object.keys(styles).map(i => {
        let root = styles[i];
        processes.map(fn => {
            root = fn(i, init, root);
        });
        parseStyle(root, init, processes, init);
        $styles[i] = root;
    });
    return getCssTree(parserJSON($styles));
}

function css(style = {}) {
    let $style = {};
    for(let name in style){
        if (isPure(style[name])) {
            $style[name] = style[name]
        }
    }
    return $style;
}

function getCssTree(style = {}) {
    function CssTree() {
        Object.assign(this, style.root);
    }

    Object.keys(style.proto).map(i => {
        if (isPlainObject(style.proto[i])) {
            CssTree.prototype[i] = getCssTree(parserJSON(style.proto[i]));
        } else {
            CssTree.prototype[i] = style.proto[i];
        }
    });
    return new CssTree();
}

function parserJSON(style = {}) {
    let $style = {proto: {}, root: {}};
    Object.keys(style).map(name => {
        let key = !isPure(style[name]) ? "proto" : "root";
        $style[key][name] = style[name];
    });
    return $style;
}