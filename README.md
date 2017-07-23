# react-native-css-tree

This is a react-native style module plug-in that features a modular JSON object tree structure.

### Features

   * Customizable Inheritance Middleware.
   * Style tree namespaces.
   * Global variables.
   * Priority inheritance.
   
### Installation
```shell
npm install --save react-native-css-tree
```
### Usage
```javascript
import cssTree from 'react-native-css-tree';

const styles = cssTree({ //globalStyle
    grid:10,
})((key, parent, sub)=>{ //middleware
    return sub;
})({
    container:{
        flex: 1,
        margin: "$.grid",
        padding: 5,
        _box:{
            height: 100,
        }
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
    * `$.` reference variable, and support the operation.
    *  If use `_` As a key prefix , it inherits all of the style properties of the parent.




