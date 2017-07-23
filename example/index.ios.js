/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import cssTree from 'react-native-css-tree';

export default class example extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.container.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.container.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.container.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const style = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "$.mainColor",
        welcome: {
            fontSize: "$.fontSize",
            textAlign: '$.alignItems',
            margin: "$.grid",
        },
        instructions: {
            textAlign: '$.alignItems',
            color: '$.textColor',
        },
    },
};

const styles = cssTree({
    mainColor: '#00d1ff',
    otherColor: '#fff',
    textColor: "#333333",
    fontSize: 20,
    backgroundColor: "red",
    grid: 10,
})(function (key, parent, sub) {
    if(key==="welcome") sub.color = parent.otherColor;
    return sub
})(style);

AppRegistry.registerComponent('example', () => example);
