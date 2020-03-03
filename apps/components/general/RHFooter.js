import React, { Component } from 'react';
import { Image, StyleSheet } from "react-native";
import { View, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class RHFooter extends Component {

    navigate = (to) => {
        this.props.navigation.navigate(to)
    }

    render() {
        return (
            <View>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.navigate("Home")} active={this.props.navigation.state.index === 0}>
                            <Icon type="AntDesign" name="home" />
                            <Text style={styles.footerFontSize}>Home</Text>
                        </Button>
                        <Button vertical onPress={() => this.navigate("History")} active={this.props.navigation.state.index === 1}>
                            <Icon type="AntDesign" name="menuunfold" />
                            <Text style={styles.footerFontSize}>History</Text>
                        </Button>
                        <Button vertical onPress={() => this.navigate("Profile")} active={this.props.navigation.state.index === 2}>
                            <Icon type="AntDesign" name="user" />
                            <Text style={styles.footerFontSize}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerFontSize : {
        fontSize : 9,
    }
});