/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from "native-base";

import { reset } from "../../utils/Navigation";

export default class FPasswordConfirm extends Component {
  render() {
    return (
        <Container>
            <View style={styles.container}>
                <Text style={styles.welcome}>Forgot Password Confirmation!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions} onPress={() => reset(this.props)}>BACK</Text>
            </View>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
