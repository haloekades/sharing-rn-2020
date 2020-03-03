/** @format */

import React, {Component} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Container, List, ListItem, Header, Left, Right, Body, Title, Button, Icon } from "native-base";

import { navigate } from "../../utils/Navigation";

export default class ErrorHandling extends Component {
    
    render() {
        return (
            <Container>
                <Header />
                <List>
                    <ListItem onPress={() => this.props.navigation.navigate('NoData')}>
                        <Text>No Data Screen</Text>
                    </ListItem>
                    <ListItem onPress={() => this.props.navigation.navigate('NoMessages')}>
                        <Text>No Message Screen</Text>
                    </ListItem>
                    <ListItem onPress={() => this.props.navigation.navigate('NoInternet')}>
                        <Text>No Internet Screen</Text>
                    </ListItem>
                    <ListItem onPress={() => this.props.navigation.navigate('Something')}>
                        <Text>Error Screen</Text>
                    </ListItem>
                </List>
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
