/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Button } from "native-base";
import { IMAGES } from "../../assets";

export default class SomethingWrong extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={IMAGES.somethingwrong} style={styles.icon} resizeMode='contain' />
                <Text style={styles.title}>Aaah! Something went wrong</Text>
                <Text style={styles.content}>Brace yourself till we get the error fixed.</Text>
                <Text style={styles.content}>You may also refresh the page or try again later.</Text>

                <Button light style={styles.tryagain} onPress={this.props.action}>
                    <Text>TRY AGAIN</Text>
                </Button>
            </View>
        )
    }
}

const styles    = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 3,
        paddingVertical: 15
    },
    icon: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 40,
        height: 200,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 7
    },
    content: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 1
    },
    tryagain: {
        alignSelf: 'center',
        padding: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15
    }
})