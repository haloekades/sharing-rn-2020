/** @format */

import React, { Component } from 'react';
import { StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content } from "native-base";

export default class CreateTask extends Component {
    state = {
        username: '',
        errorUsername: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    doBack = () =>{
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left style={styles.iconSide}>
                        <TouchableOpacity onPress={() => this.doBack()}>
                            <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.iconBody}>
                        <Title style={styles.textTitle}>Create Task</Title>
                    </Body>
                    <Right style={styles.iconSide} />
                </Header>
                <Content>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    iconSide: {
        flex: 0.5,
        paddingHorizontal: 5
    },
    iconBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
