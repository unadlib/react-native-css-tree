/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View
} from 'react-native';
import cssTree from 'react-native-css-tree';

export default class example extends Component {
    render() {
        console.log(styles.container.instructions.text("blue"),styles.container.welcome.color);
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
                    <Text style={styles.container.instructions.text("red")}>Cmd+D or shake for dev menu</Text>
                    <Text style={styles.container.instructions.text("blue")}>Test show Blue</Text>
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
        backgroundColor: "$mainColor",
        margin: 5,
        welcome: {
            fontSize: "$fontSize+$base.size",
            textAlign: '$alignItems',
            margin: " $margin",
        },
        instructions: {
            textAlign: '$alignItems',
            color: '$textColor',
            margin: 4,
            text: (color, i = 0) => ({
                color,
                fontSize: "$base.size+$fontSize-15" + i,
                margin: '$margin',
            }),
        },
    },
};

const styles = cssTree({
    mainColor: '#00d1ff',
    otherColor: '#fff',
    textColor: "#333333",
    fontSize: 20,
    backgroundColor: "red",
    margin: 10,
    base: {
        size: 5,
    },
    grid: 10,
})(function (key, parent, sub) {
    if (key === "welcome") sub.color = parent.otherColor;
    return sub
})(style);

AppRegistry.registerComponent('example', () => example);
