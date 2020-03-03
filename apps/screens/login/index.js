/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { Container, Content, Text, Input, Item, Icon, Button } from "native-base";

import _ from 'lodash';
import { IMAGES } from "../../assets";
import { validateEmail } from '../../utils/Common';
import myColor from '../../theme/variables/myColor';

const { width, height } = Dimensions.get('window');

export default class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        showPassword: false,
        errorUsername: false,
        errorPassword: false
    }

    constructor(props) {
        super(props)
    }

    onTogglePassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    onChangeUsername = (text) => {
        this.setState({ username: text, errorUsername: !validateEmail(text) })
    }

    onChangePassword = (text) => {
        this.setState({ password: text, errorPassword: text.length < 5 })
    }

    onLogin = async () => {
        let { 
            username, password,
            errorUsername, errorPassword
        } = this.state;
        
        // validation
        errorUsername = _.isEmpty(username);
        errorPassword = _.isEmpty(password);

        this.setState({ errorUsername, errorPassword });

        if (errorUsername == false && errorPassword == false) {
            // this.props.navigation.navigate('Main');
            this.props.navigation.navigate('MainApp');
        }
    }

    render() {
        let { navigation } = this.props
        let { showPassword, errorUsername, errorPassword } = this.state;

        return (
            <Container>
                <SafeAreaView />
                <Content>
                <View>
                    <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />

                    <View style={styles.form}>
                        <Item regular error={errorUsername} style={styles.formItem}>
                            <Input autoFocus onChangeText={(txt) => this.onChangeUsername(txt)} keyboardType="email-address" placeholder='Input your email'/>
                            <Icon type="Ionicons" name='md-mail' />
                        </Item>
                        <Item regular error={errorPassword} style={styles.formItem}>
                            <Input secureTextEntry={!showPassword} onChangeText={(txt) => this.onChangePassword(txt)} placeholder='Input your password'/>
                            <Button iconLeft transparent dark onPress={() => this.onTogglePassword()} style={{height: 50, paddingRight: 8}}>
                                <Icon type="Ionicons" name='ios-eye' style={{color: errorPassword ? myColor.brandDanger : myColor.brandDark }} />
                            </Button>
                        </Item>
                        <Button danger rounded block onPress={() => this.onLogin()} style={styles.btnLogin}>
                            <Text>Login</Text>
                        </Button>
                        <Button transparent small block onPress={() => navigation.navigate('FPasswordForm')} style={styles.btnForgot}>
                            <Text>Forgot password?</Text>
                        </Button>
                    </View>
                </View>
                </Content>
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
    btnLogin: {
        marginTop: 10
    },
    btnForgot: {
        marginTop: 10
    }
});
