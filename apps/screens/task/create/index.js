/** @format */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Button, Card, Item, Input, Toast } from "native-base";

const { height } = Dimensions.get('window');

export default class CreateTask extends Component {
    state = {
        title:'Create Task',
        category: '',
        name: '',
        date: '',
        description: '',
        errorDate: false,
        errorCategory: false,
        errorName: false,
        errorDescription: false,

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() { 
        let { params } = this.props.route;
        if (params != null && params.data) {
            this.setState({
                title : 'Edit Task',
                category : params.data.category,
                name: params.data.name,
                date: params.data.date,
                description: params.data.description,
                errorDate: false,
                errorCategory: false,
                errorName: false,
                errorDescription: false,
            })
        }
    }

    doBack = () => {
        this.props.navigation.goBack();
    }

    onChangeCategory = (text) => {
        this.setState({ category: text, errorCategory: false })
    }

    onChangeDate = (text) => {
        this.setState({ date: text, errorDate: false })
    }

    onChangeTitle = (text) => {
        this.setState({ name: text, errorName: false })
    }

    onChangeDescription = (text) => {
        this.setState({ description: text, errorDescription: false })
    }

    showToast = (isSuccess) => {
        Toast.show({
            text: isSuccess ? "Input data berhasil di simpan" : "Input data gagal di simpan",
            duration: 2000
        });

        if (isSuccess)
            this.doBack()
    }

    showAlert = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah data yang anda input sudah benar ?',
            [
                {
                    text: 'Tidak',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Ya', onPress: () =>
                        this.showToast(true)
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        let { title, category, name, date, description ,errorName, errorCategory, errorDescription } = this.state;

        return (
            <Container>
                <Header noShadow>
                    <Left style={styles.iconSide}>
                        <TouchableOpacity onPress={() => this.doBack()}>
                            <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.iconBody}>
                        <Title style={styles.textTitle}>{title}</Title>
                    </Body>
                    <Right style={styles.iconSide} />
                </Header>
                <Content style={{ padding: 10 }}>
                    <Card style={{ padding: 16 }}>
                        <Text style={styles.textField}>Category</Text>
                        <Item regular error={errorCategory} style={styles.formItem}>
                            <Input  value={category} autoFocus onChangeText={(txt) => this.onChangeCategory(txt)} keyboardType="default" placeholder='Select Category' />
                            <Icon type="Entypo" name='chevron-small-down' />
                        </Item>
                        <Text style={styles.textField}>Input Date</Text>
                        <Item regular error={errorCategory} style={styles.formItem}>
                            <Input value={date} autoFocus onChangeText={(txt) => this.onChangeCategory(txt)} keyboardType="default" placeholder='Input Date' />
                            <Icon type="Entypo" name='calendar' />
                        </Item>
                        <Text style={styles.textField}>Task Name</Text>
                        <Item regular error={errorName} style={styles.formItem}>
                            <Input value={name}  autoFocus onChangeText={(txt) => this.onChangeTitle(txt)} keyboardType="default" placeholder='Input Task Name' />
                        </Item>
                        <Text style={styles.textField}>Description</Text>
                        <Item regular error={errorDescription} style={styles.formItem}>
                            <Input value={description} style={{ height: height / 5 }} autoFocus onChangeText={(txt) => this.onChangeDescription(txt)} keyboardType="default" placeholder='Input Description' />
                        </Item>
                    </Card>
                    <Button onPress={() => this.showAlert()} success rounded block style={styles.btnLogin}>
                        <Text>SAVE</Text>
                    </Button>
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
    formItem: {
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    textField: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    btnLogin: {
        marginTop: 10,
    }
});
