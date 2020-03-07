/** @format */

import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Container, Text, Left, Header, Body, Icon, Title, Right, Content, Button, Card, Item, Input, Toast } from "native-base";

const { height } = Dimensions.get('window');

export default function CreateTask({ navigation, route }) {
    const [title, setTitle] = useState('Create Task');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [errorDate, setErrorDate] = useState(false);
    const [errorCategory, setErrorCategory] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    useEffect(() => {
        let { params } = route;
        if (params != null && params.data) {
            setTitle('Edit Task')
            setCategory(params.data.category)
            setName(pparams.data.name)
            setDate(params.data.date)
            setDescription(params.data.description)
            setErrorDate(false)
            setErrorCategory(false)
            setErrorName(false)
            setErrorDescription(false)
        }
    }, []);

    function onChangeCategory(text){
        setCategory(text)
        setErrorCategory(false)
    }

    function onChangeDate(text){
        setDate(text)
        setErrorDate(false)
    }

    function onChangeTitle(text){
        setName(text)
        setErrorName(false)
    }

    function onChangeDescription(text){
        setDescription(text)
        setErrorDescription(false)
    }

    function showToast(isSuccess){
        Toast.show({
            text: isSuccess ? "Input data berhasil di simpan" : "Input data gagal di simpan",
            duration: 2000
        });

        if (isSuccess)
            navigation.goBack()
    }

    function showAlert(){
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
                        showToast(true)
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <Container>
            <SafeAreaView/>
            <Header noShadow>
                <Left style={styles.iconSide}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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
                        <Input value={category} autoFocus onChangeText={(txt) => onChangeCategory(txt)} keyboardType="default" placeholder='Select Category' />
                        <Icon type="Entypo" name='chevron-small-down' />
                    </Item>
                    <Text style={styles.textField}>Input Date</Text>
                    <Item regular error={errorCategory} style={styles.formItem}>
                        <Input value={date} autoFocus onChangeText={(txt) => onChangeDate(txt)} keyboardType="default" placeholder='Input Date' />
                        <Icon type="Entypo" name='calendar' />
                    </Item>
                    <Text style={styles.textField}>Task Name</Text>
                    <Item regular error={errorName} style={styles.formItem}>
                        <Input value={name} autoFocus onChangeText={(txt) => onChangeTitle(txt)} keyboardType="default" placeholder='Input Task Name' />
                    </Item>
                    <Text style={styles.textField}>Description</Text>
                    <Item regular error={errorDescription} style={styles.formItem}>
                        <Input value={description} style={{ height: height / 5 }} autoFocus onChangeText={(txt) => onChangeDescription(txt)} keyboardType="default" placeholder='Input Description' />
                    </Item>
                </Card>
                <Button onPress={() => showAlert()} success rounded block style={styles.btnLogin}>
                    <Text>SAVE</Text>
                </Button>
            </Content>
        </Container>
    );
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
