/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Container, Text, Input, Item, Icon, Button } from "native-base";

import _ from 'lodash';
import { IMAGES } from "../../assets";
import { validateEmail } from '../../utils/Common';
import { RHHeader } from '../../components';
import myColor from '../../theme/variables/myColor';

const { width, height } = Dimensions.get('window');

export default class FPasswordForm extends Component {
    state = {
        username: '',
        errorUsername: false,
    }

    constructor(props) {
        super(props)
    }

    onChangeUsername = (text) => {
        this.setState({ username: text, errorUsername: !validateEmail(text) })
    }

    onSubmit = async () => {
        let { username, errorUsername } = this.state;
        
        // validation
        errorUsername = _.isEmpty(username);

        this.setState({ errorUsername });

        if (errorUsername == false) {
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        let { navigation } = this.props
        let { errorUsername } = this.state;

        return (
            <Container>
                <View>
                    <RHHeader 
                        title={'Forgot Password'}
                        leftButton={
                            <Button transparent dark small onPress={() => navigation.goBack()}>
                                <Icon type="AntDesign" name="left" />
                            </Button>
                        }
                        rightButton={<Text />} />
                    <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />

                    <View style={styles.form}>
                        <Item regular error={errorUsername} style={styles.formItem}>
                            <Input autoFocus onChangeText={(txt) => this.onChangeUsername(txt)} keyboardType="email-address" placeholder='Input your email'/>
                            <Icon type="Ionicons" name='md-mail' />
                        </Item>
                        
                        <Button danger rounded block onPress={() => this.onSubmit()} style={styles.btnSumbit}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    greeting: {
        position: 'absolute',
        top: 30,
        left: 25
    },
    illustrator: {
        width: width - (width/4),
        height: width - (width/4), 
        marginTop: height/8,
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
    form: {
        marginTop: height/8,
        marginHorizontal: 25
    },
    formItem: {
        marginBottom: 10,
        borderRadius: 25,
        paddingHorizontal: 15
    },
    btnSumbit: {
        marginTop: 10
    },
});
