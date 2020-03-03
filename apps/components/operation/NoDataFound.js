/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { IMAGES } from "../../assets";

export default class NoData extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={IMAGES.nodata} style={styles.icon} resizeMode='contain' />
                <Text style={styles.title}>{this.props.title ? this.props.title : 'Data'} Not Found!</Text>
                <Text style={styles.content}>Looks like we don't provide the service</Text>
                <Text style={styles.content}>in your subscription at the moment.</Text>
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
})