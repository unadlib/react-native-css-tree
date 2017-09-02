# react-native-css-tree
[![Travis](https://img.shields.io/travis/unadlib/react-native-css-tree.svg)](https://travis-ci.org/unadlib/react-native-css-tree)
[![npm](https://img.shields.io/npm/l/react-native-css-tree.svg)](https://www.npmjs.com/package/react-native-css-tree)
[![npm](https://img.shields.io/npm/v/react-native-css-tree.svg)](https://www.npmjs.com/package/react-native-css-tree)
[![npm](https://img.shields.io/npm/dt/react-native-css-tree.svg)](https://www.npmjs.com/package/react-native-css-tree)

This is a react-native style module plug-in that features a modular JSON object tree structure.

### Features

   * Customizable Inheritance Middleware.
   * Style tree namespaces.
   * Global variables.
   * Priority inheritance.
   * Functional CSS.

### Installation
```shell
npm install --save react-native-css-tree
```
### Usage
```javascript
import cssTree from 'react-native-css-tree';

const styles = cssTree({ //globalStyle
    grid:10,
    base:{
        size: 10,
    }
})((key, parent, sub)=>{ //middleware
    return sub;
})({
    container:{
        flex: 1,
        margin: "$grid",
        padding: 5,
        _box:{
            height: 100,
        },
        text:(color)=>({
            color,
            fontSize: "$base.size"
        })
    },
});

<View style={styles.container}>
    <View style={styles.container._box}></View>
</View>
```
### Configuration

    Styles = cssTree(GlobalStyle)(Middleware)(Style);

* GlobalStyle is used to configure global theme styles.
* Middleware supports multiple middleware functions.
* Style is original style tree:
    * `$` reference variable, and support the operation.
    *  If use `_` As a key prefix , it inherits all of the style properties of the parent.




