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
import {css, createCSS} from 'react-native-css-tree';

export default class example extends Component {
    render() {
        return (
            <View style={css(styles.container)}>
                <Text style={css(styles.container.welcome)}>
                    Welcome to React Native!
                </Text>
                <Text style={css(styles.container.instructions)}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={css(styles.container.instructions)}>
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

const styles = createCSS({
    mainColor: '#00d1ff',
    textColor: "#333333",
    fontSize: 20,
    grid: 10,
})(function (key, parent, sub) {
    sub.marginBottom = 5;
    return sub
})(style);

AppRegistry.registerComponent('example', () => example);
