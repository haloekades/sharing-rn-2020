/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, Icon, Card, CardItem } from "native-base";

export default class Profile extends Component {

    state = {
        avatar: "",
        name: "",
        email: "",
        departemnt: "",
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getDataProfileFromDB()
    }

    getDataProfileFromDB = async () => {
        const dataProfile = await AsyncStorage.getItem("DATA_PROFILE");

        if (dataProfile != null && dataProfile != "") {
            let profile = JSON.parse(dataProfile);

            if (profile != null) {
                this.setState({
                    avatar: profile.avatar,
                    name: profile.name,
                    email: profile.email,
                    departemnt: profile.department,
                })
            }
        }
    }

    doLogout = async () => {
        await AsyncStorage.setItem("DATA_PROFILE", "")
        this.props.navigation.replace('Login')
    }


    _renderProfile = (type, value) => {
        return (
            <View>
                <Text style={styles.textNormal}>{type}</Text>
                <Text style={styles.textTitle}>{value}</Text>
                <View style={styles.line} />
            </View>
        );
    }


    render() {
        let { avatar, name, email, departemnt } = this.state

        return (
            <Container>
                <Header noShadow>
                    <Body style={{ paddingHorizontal: 16 }}>
                        <Title style={styles.textTitle}>PROFILE</Title>
                    </Body>
                </Header>
                <Content style={styles.container}>
                    <View style={styles.mainView}>
                        {/* <Icon style={styles.imageProfile} type='AntDesign' name='github' /> */}
                        <Image source={{ uri: avatar }}
                            style={styles.imageProfile} />
                        <Card style={{ marginTop: 25 }}>
                            <CardItem nopadding >
                                <View style={{ flex: 1, marginBottom: 10 }}>
                                    {this._renderProfile("Name", name)}
                                    {this._renderProfile("Email", email)}
                                    {this._renderProfile("Jabatan", departemnt)}
                                </View>
                            </CardItem>
                        </Card>
                        <Card style={{ marginTop: 20 }}>
                            <CardItem >
                                <TouchableOpacity
                                    onPress={this.doLogout} style={styles.touchLogout}>
                                    <Icon style={styles.icon} type='AntDesign' name='logout' />
                                    <Text style={[styles.textTitle, { marginTop: 0, marginLeft: 5 }]}>Logout</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        padding: 15
    },
    icon: {
        fontSize: 26,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    textNormal: {
        fontSize: 14,
        marginTop: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        marginTop: 10,
    },
    touchLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    imageProfile: {
        alignSelf: 'center',
        width: 90,
        height: 90,
        borderRadius: 50,
        marginTop: 15
    },
});
