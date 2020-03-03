/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { IMAGES } from "../../assets";

export default class NoMessage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={IMAGES.nomessage} style={styles.icon} resizeMode='contain' />
                <Text style={styles.title}>No notification yet!</Text>
                <Text style={styles.content}>Looks like you haven't messages.</Text>
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