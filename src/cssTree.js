/**
 * Author   : unadlib
 * Date     : 2017/7/19
 * Time     : 上午12:30
 * Project [ react-native-css-tree ] Coded on WebStorm.
 */

const prefix = "$";
const inheritRegular = new RegExp("^\_");
const variableRegular = new RegExp(`\\${prefix}\.`);

export function createCSS(init = {}) {
    return function (...processes) {
        return function (styles) {
            return getTree(styles, init, processes);
        };
    }
}

function isPlainObject(arg) {
    return toString.call(arg) === "[object Object]";
}

function parseStyle(style = {}, init = {}, processes = [], variables = {}) {
    Object.keys(style).map(i => {
        let isSubNode = isPlainObject(style[i]);
        let clone = JSON.parse(JSON.stringify(style[i]));
        if (isSubNode) {
            let newStyle = inheritRegular.test(i) ? Object.assign(style[i], css(style), clone) : style[i];
            processes.map(fn => {
                newStyle = fn(i, style, newStyle);
            });
            parseStyle(newStyle, init, processes, {...variables, ...css(style)});
        } else {
            if (variableRegular.test(style[i])) {
                style[i] = new Function(prefix, `return ${style[i]}`)(variables);
            }
        }
    });
}

function getTree(styles = {}, init = {}, processes = []) {
    let $styles = {};
    Object.keys(styles).map(i => {
        let root = styles[i];
        parseStyle(root, init, processes, init);
        $styles[i] = root;
    });
    return $styles;
}

export function css(style = {}) {
    let $style = {};
    Object.keys(style).map(name => {
        if (!isPlainObject(style[name])) $style[name] = style[name];
    });
    return $style;
};
