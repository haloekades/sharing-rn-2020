/** @format */

import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { Container, Content, Text, Input, Item, Icon, Button } from "native-base";

import _ from 'lodash';
import { IMAGES } from "../../assets";
import { validateEmail } from '../../utils/Common';
import myColor from '../../theme/variables/myColor';

const { width, height } = Dimensions.get('window');
import { loginUser } from "../../utils/api/Login"

export default function LoginForm({ navigation }) {
    const [username, setUsername] = useState("admin@gmail.com");
    const [password, setPassword] = useState("12345");
    const [showPassword, setShowPassword] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    onTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    onChangeUsername = (text) => {
        setUsername(text)
        setErrorUsername(!validateEmail(text))
    }

    onChangePassword = (text) => {
        setPassword(text)
        setErrorPassword(text.length < 5)
    }

    async function onLogin() {
        // validation
        isErrorUsername = _.isEmpty(username);
        isErrorPassword = _.isEmpty(password);

        setErrorUsername(isErrorUsername)
        setErrorPassword(isErrorPassword)

        if (isErrorUsername == false && isErrorPassword == false) {
            // navigation.replace('MainApp');
            doLogin(username, password)
        }
    }

    async function doLogin(username, password) {
        const params = {
            email: username,
            password: password

            // name: 'Pengadaan Alat Berat 4',
            // description: 'Pengadaan Alat Berat 4',
            // request_date: '2020-03-07',
            // assign_user: 3,
            // //response_date:
            // response_user: 2,
            // //response_message:
            // category: 'PENGADAAN',
            // status: 'W',
        }



        let response = await loginUser(params);

        console.log('login res', response)
    }

    return (
        <Container>
            <SafeAreaView />
            <Content>
                <View>
                    <Image source={IMAGES.drilling} resizeMode='contain' style={styles.illustrator} />

                    <View style={styles.form}>
                        <Item regular error={errorUsername} style={styles.formItem}>
                            <Input autoFocus onChangeText={(txt) => this.onChangeUsername(txt)} keyboardType="email-address" placeholder='Input your email' />
                            <Icon type="Ionicons" name='md-mail' />
                        </Item>
                        <Item regular error={errorPassword} style={styles.formItem}>
                            <Input secureTextEntry={!showPassword} onChangeText={(txt) => this.onChangePassword(txt)} placeholder='Input your password' />
                            <Button iconLeft transparent dark onPress={() => this.onTogglePassword()} style={{ height: 50, paddingRight: 8 }}>
                                <Icon type="Ionicons" name='ios-eye' style={{ color: errorPassword ? myColor.brandDanger : myColor.brandDark }} />
                            </Button>
                        </Item>
                        <Button danger rounded block onPress={() => onLogin()} style={styles.btnLogin}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    greeting: {
        position: 'absolute',
        top: 30,
        left: 25
    },
    illustrator: {
        width: width - (width / 4),
        height: width - (width / 4),
        marginTop: height / 8,
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
    form: {
        marginTop: height / 8,
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
