/**
 * Author   : unadlib
 * Date     : 2017/7/19
 * Time     : 上午12:30
 * Project [ react-native-css-tree ] Coded on WebStorm.
 */


export default function (init) {
    class cssTree {
        constructor() {
            Object.keys(init).map(i => {
                this[i] = init[i];
            });
        }
    }

    return function (...processes) {
        return new cssTree();
    }
}

