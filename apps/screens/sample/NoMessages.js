/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from "native-base";

import { navigate } from "../../utils/Navigation";
import { NoMessage } from '../../components';

export default class NoMessages extends Component {

    reload  = ()    => {
        alert('Reload called');
    }
    
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <NoMessage />
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
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
