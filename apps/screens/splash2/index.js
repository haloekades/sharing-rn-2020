/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { Container, Text } from "native-base";

import _ from 'lodash';
import { IMAGES } from "../../assets";

const { width, height } = Dimensions.get('window');

export default class Splash2 extends Component {
    state = {
        username: '',
        errorUsername: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(() => {
            // this.props.navigation.navigate('Auth');
            // this.props.navigation.navigate('MainApp');
        }, 2000)
    }

    render() {

        return (
            <Container>
                <SafeAreaView />
                <View style={{flex: 1}}>
                    <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />
                    <Text style={styles.loading}>SPlash 2</Text>
                    <Text style={styles.version}>Version 1.0</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    illustrator: {
        width: width - (width/4),
        height: width - (width/4), 
        marginTop: height/4,
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
    loading: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'center'
    },
    version: {
        position: 'absolute',
        bottom: 20,
        left: '43%',
        fontSize: 10,
        textAlign: 'center',
    }
});
